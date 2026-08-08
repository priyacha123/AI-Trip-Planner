import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { cn } from "../../lib/utils";
import { FALLBACK_IMAGE } from "../../constants/images";

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
  const tripId = trip?.id;

  return (
    <Link
      to={`/view-trip/${tripId}`}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_-10px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {/* Image — fills ~90% of the card height, full width */}
      <div className="relative w-full flex-1 overflow-hidden">
        <img
          src={photoUrl || FALLBACK_IMAGE}
          alt={destination}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* View Details button — centered on white */}
      <div className="flex h-[10%] shrink-0 items-center justify-center bg-white">
        <span className="text-sm font-medium tracking-wide text-[#0f0f0d] transition-colors group-hover:text-primary">
          View Details
        </span>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
