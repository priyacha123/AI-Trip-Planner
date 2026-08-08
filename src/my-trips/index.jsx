import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  ArrowRight,
  Grid3X3,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { db } from "../service/firebaseConfi";
import UserTripCardItem from "./components/UserTripCardItem";
import UserTripListItem from "./components/UserTripListItem";
import Texture from "../components/custom/Texture";
import { Carousel } from "../components/custom/Carousel";
import { StatPill, StatPillRow } from "../components/custom/StatPill";
import SignInDialog from "../components/custom/sign-in-dialog";
import { cn } from "../lib/utils";

const MyTrips = () => {
  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchTrips = async () => {
      let currentUser = null;
      try {
        currentUser = JSON.parse(localStorage.getItem("user"));
      } catch {
        currentUser = null;
      }
      if (!currentUser) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (!cancelled) setUser(currentUser);

      try {
        const q = query(
          collection(db, "AITrips"),
          where("userEmail", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });
        if (!cancelled) setUserTrips(trips);
      } catch (error) {
        console.error(error);
        if (!cancelled) toast.error("Failed to load trips");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrips();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeTrip = userTrips[activeIndex] || null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a1917] to-[#0f0f0d] text-white">
      <Texture>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">
              My Trips
            </h2>

            <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  viewMode === "carousel"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">3D View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  viewMode === "list"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex h-[420px] md:h-[520px] items-center justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 w-48 md:w-64 rounded-2xl bg-white/5 animate-pulse border border-white/5"
                  />
                ))}
              </div>
            </div>
          ) : !user ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-20 px-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <MapPin className="h-8 w-8 text-white/30" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-2">
                No trips yet
              </h2>
              <p className="text-sm text-white/50 mb-8 max-w-sm">
                No trips yet — create an account to start planning.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/create-trip" className="no-underline">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0f0f0d] transition hover:bg-white/90">
                    Create your first trip
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenDialog(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Sign in
                </button>
              </div>
            </div>
          ) : userTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-20 px-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <MapPin className="h-8 w-8 text-white/30" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-2">
                No trips yet
              </h2>
              <p className="text-sm text-white/50 mb-8 max-w-sm">
                Create an account and plan your first trip — it'll appear here.
              </p>
              <Link to="/create-trip" className="no-underline">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0f0f0d] transition hover:bg-white/90">
                  Create your first trip
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          ) : viewMode === "carousel" ? (
            <div className="flex flex-col items-center">
              {activeTrip && (
                <>
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-[11px] font-medium uppercase tracking-widest">
                        {activeTrip?.userSelection?.location?.label || "Trip"}
                      </span>
                    </div>
                    <p className="text-xs text-white/40">
                      {activeTrip?.userSelection?.startDate || activeTrip?.travelDate || ""}{" "}
                      {activeTrip?.userSelection?.endDate ? `— ${activeTrip.userSelection.endDate}` : ""}
                    </p>
                  </div>

                  <div className="w-full max-w-xl h-[420px] md:h-[520px] mb-6">
                    <Carousel activeIndex={activeIndex} onChange={setActiveIndex}>
                      {userTrips.map((trip) => (
                        <div key={trip.id} className="h-full w-full">
                          <UserTripCardItem trip={trip} className="h-full" />
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  <StatPillRow className="mb-6">
                    {activeTrip?.userSelection?.total_days && (
                      <StatPill
                        icon={Calendar}
                        label="Duration"
                        value={`${activeTrip.userSelection.total_days}d`}
                      />
                    )}
                    {activeTrip?.userSelection?.budget && (
                      <StatPill
                        icon={Wallet}
                        label="Budget"
                        value={activeTrip.userSelection.budget}
                      />
                    )}
                    {activeTrip?.userSelection?.travelers && (
                      <StatPill
                        icon={Users}
                        label="Travelers"
                        value={activeTrip.userSelection.travelers}
                      />
                    )}
                    {!activeTrip?.userSelection?.total_days &&
                      !activeTrip?.userSelection?.budget && (
                        <StatPill icon={MapPin} label="Trip" value="Planned" />
                      )}
                  </StatPillRow>

                  <div className="flex items-center gap-3">
                    {userTrips.map((trip, index) => (
                      <button
                        key={trip.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          index === activeIndex
                            ? "w-6 bg-white"
                            : "bg-white/30 hover:bg-white/50"
                        )}
                        aria-label={`Go to trip ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {userTrips.map((trip) => (
                <UserTripListItem key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </Texture>

      <Link
        to="/create-trip"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f0f0d] shadow-lg transition hover:scale-105 hover:shadow-xl"
        aria-label="Create new trip"
      >
        <ArrowRight className="h-6 w-6 rotate-45" />
      </Link>

      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default MyTrips;
