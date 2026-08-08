import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ArrowRight, Calendar, Heart, MapPin, Wallet } from "lucide-react";
import { toast } from "sonner";
import { db } from "../service/firebaseConfi";
import { getPlacePhoto } from "../service/UnsplashApi";
import { FALLBACK_IMAGE } from "../constants/images";
import SignInDialog from "../components/custom/sign-in-dialog";
import { Button } from "../components/ui/button";

const SavedTripCard = ({ trip, onUnsave }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const destination = trip?.userSelection?.location?.label || "Saved trip";
  const tripId = trip?.tripId || trip?.id;
  const days = trip?.userSelection?.total_days;
  const budget = trip?.userSelection?.budget;
  const startDate = trip?.userSelection?.startDate;
  const endDate = trip?.userSelection?.endDate;
  const singleDate = startDate || trip?.travelDate;

  const dateLabel =
    startDate && endDate
      ? `${startDate} — ${endDate}`
      : singleDate
      ? singleDate
      : days
      ? `${days} days`
      : "Dates to plan";

  useEffect(() => {
    let cancelled = false;
    const fetchPhoto = async () => {
      try {
        const url = await getPlacePhoto(trip?.userSelection?.location?.label);
        if (!cancelled) setPhotoUrl(url);
      } catch {
        if (!cancelled) setPhotoUrl(null);
      }
    };
    if (trip?.userSelection?.location?.label) fetchPhoto();
    return () => {
      cancelled = true;
    };
  }, [trip]);

  return (
    <div className="group relative h-full">
      <Link
        to={`/view-trip/${tripId}`}
        className="block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(15,118,110,0.35)]"
      >
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <img
            src={photoUrl || FALLBACK_IMAGE}
            alt={destination}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-5">
          <div className="mb-1 flex items-center gap-1.5 text-primary">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium uppercase tracking-widest">
              {destination}
            </span>
          </div>
          <h3 className="mb-4 font-serif text-xl leading-tight text-foreground">
            {destination}
          </h3>

          <div className="flex items-center justify-between gap-3 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>{dateLabel}</span>
            </div>
            {budget && (
              <div className="flex items-center gap-1.5 text-xs">
                <Wallet className="h-3.5 w-3.5" />
                <span>{budget}</span>
              </div>
            )}
          </div>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            View Trip
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={onUnsave}
        aria-label="Remove from saved"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-110 hover:bg-white"
      >
        <Heart className="h-5 w-5 fill-current text-rose-500" />
      </button>
    </div>
  );
};

const Saved = () => {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    const q = query(
      collection(db, "SavedTrips"),
      where("userEmail", "==", user.email)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const trips = [];
        snapshot.forEach((docSnap) => {
          trips.push({ docId: docSnap.id, ...docSnap.data() });
        });
        if (!cancelled) {
          setSavedTrips(trips);
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        if (!cancelled) {
          toast.error("Failed to load saved trips");
          setLoading(false);
        }
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [user]);

  const handleUnsave = async (docId) => {
    try {
      await deleteDoc(doc(db, "SavedTrips", docId));
      toast.success("Removed from saved trips");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove trip");
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
            Your collection
          </p>
          <h1 className="font-serif text-4xl font-normal text-foreground md:text-5xl">
            Saved trips
          </h1>
        </header>

        {!user ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-serif text-2xl text-foreground">
              Sign in to see your saved trips
            </h2>
            <p className="mb-8 max-w-sm text-sm text-muted-foreground">
              Sign in with Google to view the trips you&apos;ve saved for later.
            </p>
            <Button
              onClick={() => setOpenDialog(true)}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign in
            </Button>
          </div>
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : savedTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-serif text-2xl text-foreground">
              No saved trips yet
            </h2>
            <p className="mb-8 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any trip to keep it here for later.
            </p>
            <Link to="/create-trip" className="no-underline">
              <Button className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Create a trip
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedTrips.map((trip) => (
              <SavedTripCard
                key={trip.docId}
                trip={trip}
                onUnsave={() => handleUnsave(trip.docId)}
              />
            ))}
          </div>
        )}
      </div>

      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Saved;
