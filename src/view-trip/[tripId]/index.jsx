import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Wallet,
  Users,
  MapPin,
  Compass,
  Sun,
  Heart,
  Loader2,
} from "lucide-react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import SignInDialog from "../../components/custom/sign-in-dialog";
import { Button } from "../../components/ui/button";

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // used to get trip info from firebase
  useEffect(() => {
    if (!tripId) return;
    const docRef = doc(db, "AITrips", tripId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setTrip(docSnap.data());
        } else {
          toast.message("No Trip Found.");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);

  // Check whether this trip is already saved by the logged-in user
  useEffect(() => {
    if (!user?.email || !tripId) return;
    let active = true;

    const checkSaved = async () => {
      try {
        const savedRef = doc(db, "SavedTrips", `${user.email}_${tripId}`);
        const savedSnap = await getDoc(savedRef);
        if (active) setIsSaved(savedSnap.exists());
      } catch (error) {
        console.error(error);
      }
    };

    checkSaved();
    return () => {
      active = false;
    };
  }, [user, tripId]);

  const savedDocId = user?.email && tripId ? `${user.email}_${tripId}` : null;

  const handleToggleSave = async () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!trip || !savedDocId) return;

    setSaving(true);
    try {
      if (isSaved) {
        await deleteDoc(doc(db, "SavedTrips", savedDocId));
        setIsSaved(false);
        toast.success("Trip removed from saved");
      } else {
        await setDoc(
          doc(db, "SavedTrips", savedDocId),
          {
            userEmail: user.email,
            tripId,
            savedAt: new Date().toISOString(),
            userSelection: trip?.userSelection,
            tripData: trip?.tripData,
            id: trip?.id ?? tripId,
          },
          { merge: true }
        );
        setIsSaved(true);
        toast.success("Trip saved to favorites");
      }
    } catch {
      toast.error("Couldn't update saved trips");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading trip details...</span>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10 text-center text-muted-foreground">No trip found.</div>
    );
  }

  const userSelection = trip?.userSelection ?? {};
  const bestTime = trip?.tripData?.itinerary?.[0]?.best_time_to_visit;
  const tripStyle = userSelection?.tripStyle
    ? userSelection.tripStyle.charAt(0).toUpperCase() + userSelection.tripStyle.slice(1)
    : null;
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(userSelection?.location?.label || "");

  const detailsRows = [
    { icon: MapPin, label: "Destination", value: userSelection?.location?.label },
    {
      icon: CalendarDays,
      label: "Duration",
      value: userSelection?.total_days ? `${userSelection.total_days} days` : null,
    },
    {
      icon: Users,
      label: "Travellers",
      value: userSelection?.traveller
        ? `${userSelection.traveller} ${userSelection.traveller === 1 ? "person" : "people"}`
        : null,
    },
    { icon: Wallet, label: "Budget", value: userSelection?.budget },
    { icon: Compass, label: "Style", value: tripStyle },
    { icon: Sun, label: "Best time", value: bestTime },
  ];

  return (
    <>
      <div className="min-h-screen bg-background px-5 py-8 text-foreground md:px-10 md:py-10 lg:px-14 xl:px-20">
        {/* Hero header — centered */}
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-normal text-foreground md:text-5xl">
            {trip?.tripData?.tripData?.trip_title}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {trip?.tripData?.tripData?.trip_summary}
          </p>
        </header>

        {/* Photo hero — centered */}
        <div className="mx-auto mt-6 max-w-5xl">
          <InfoSection trip={trip} />
        </div>

        {/* Content grid — on mobile the details + save block renders first
            (directly below the hero), then the main column (hotels → places → footer).
            On large screens the aside sits in the right 320px column and stays sticky. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Sidebar: Trip details + Save to favorites */}
          <aside className="space-y-6 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-8 lg:self-start">
            {/* Trip details */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-serif text-xl text-foreground">Trip details</h2>

              <div className="mt-4 space-y-3.5">
                {detailsRows.map((row) => {
                  const RowIcon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <RowIcon className="h-4 w-4 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {row.label}
                        </p>
                        <p className="truncate text-sm font-medium text-foreground">
                          {row.value || "—"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link to={mapsUrl} target="_blank" className="mt-5 block">
                <Button variant="outline" className="w-full rounded-full">
                  <MapPin className="h-4 w-4" />
                  View on map
                </Button>
              </Link>
            </div>

            {/* Save to favorites */}
            <Button
              onClick={handleToggleSave}
              disabled={saving}
              className="h-14 w-full rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart className={isSaved ? "h-5 w-5 fill-current" : "h-5 w-5"} />
              )}
              {isSaved ? "Saved ✓" : "Save trip"}
            </Button>
          </aside>

          {/* Main column: Hotels → PlacesToVisit → Footer */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Hotels trip={trip?.tripData} />
            <div className="mt-10">
              <PlacesToVisit trip={trip?.tripData} />
            </div>
            <Footer />
          </div>
        </div>
      </div>

      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Viewtrip;
