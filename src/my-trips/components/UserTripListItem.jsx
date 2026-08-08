import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Wallet, ArrowRight, MapPin } from "lucide-react";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { FALLBACK_IMAGE } from "../../constants/images";

const UserTripListItem = ({ trip }) => {
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
  const travellers = trip?.userSelection?.traveller ?? trip?.userSelection?.travelers ?? 1;
  const startDate = trip?.userSelection?.startDate || trip?.travelDate || "";

  return (
    <Link
      to={`/view-trip/${trip.id}`}
      className="group no-underline"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        {/* Image with destination overlay */}
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={photoUrl || FALLBACK_IMAGE}
            alt={destination}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0d]/90 via-[#0f0f0d]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="mb-0.5 flex items-center gap-1.5 text-white/70">
                <MapPin className="h-3 w-3" />
                <span className="truncate text-[10px] font-medium uppercase tracking-widest">
                  {destination}
                </span>
              </div>
              <h3 className="truncate font-serif text-xl leading-tight text-white">
                {destination}
              </h3>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#0f0f0d] transition-colors group-hover:bg-primary group-hover:text-white">
              View trip
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4 text-xs text-white/50">
          {startDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-white/40" />
              {startDate}
            </span>
          )}
          {days > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-white/40" />
              {days} days
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-white/40" />
            {travellers} traveller{travellers === 1 ? "" : "s"}
          </span>
          {budget !== "N/A" && (
            <span className="inline-flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-white/40" />
              {budget}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserTripListItem;
