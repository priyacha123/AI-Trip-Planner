import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Wallet } from "lucide-react";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { cn } from "../../lib/utils";

const UserTripCardItem = ({ trip, className }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

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
    return () => { cancelled = true; };
  }, [trip]);

  const destination = trip?.userSelection?.location?.label || "Unknown Destination";
  const days = trip?.userSelection?.total_days || 0;
  const budget = trip?.userSelection?.budget || "N/A";
  const tripId = trip?.id;

  return (
    <Link
      to={`/view-trip/${tripId}`}
      className={cn(
        "group block h-full w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        "overflow-hidden transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_-10px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={photoUrl || "/home-trip.webp"}
          alt={destination}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-1.5 text-white/70 mb-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium uppercase tracking-widest">
              {destination}
            </span>
          </div>
          <h3 className="font-serif text-xl text-white leading-tight">
            {destination}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-white/60 mb-4">
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span>{days} days</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Wallet className="h-3.5 w-3.5" />
            <span>{budget}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-colors group-hover:bg-white/10 group-hover:text-white">
          View Trip
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
