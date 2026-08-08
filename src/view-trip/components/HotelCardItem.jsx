import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { Button } from "../../components/ui/button";
import { IoIosSend } from "react-icons/io";
import { Wallet, Star, MapPin } from "lucide-react";
import { HOTEL_FALLBACK } from "../../constants/images";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (!hotel?.hotelName) return;
    let active = true;
    getPlacePhoto(`${hotel.hotelName} hotel`).then((url) => {
      if (active && url) setPhotoUrl(url);
    });
    return () => {
      active = false;
    };
  }, [hotel]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/40">
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={photoUrl || HOTEL_FALLBACK}
          alt={hotel.hotelName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 p-4">
        <h3 className="truncate font-semibold text-foreground">{hotel.hotelName}</h3>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Wallet className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{hotel.priceRange}</span>
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 shrink-0 text-primary" />
          {hotel.rating}
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{hotel.hotelAddress}</span>
        </p>

        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(`${hotel?.hotelName}, ${hotel?.hotelAddress}`)
          }
          target="_blank"
          className="mt-auto inline-flex pt-3"
        >
          <Button className="cursor-pointer rounded-full px-3 text-xs" size="sm">
            <IoIosSend />
            View on map
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HotelCardItem;
