import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";
import { IoIosSend } from "react-icons/io";
import { Clock, Ticket, Star } from "lucide-react";
import { FALLBACK_IMAGE } from "../../constants/images";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    getPlacePhoto(`${place.placeName} ${place.placeAddress}`).then(setPhotoUrl);
  }, [place]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground transition-all hover:shadow-md hover:border-primary/40">
      <DirectionAwareHover className="h-44" imageUrl={photoUrl ? photoUrl : FALLBACK_IMAGE} />

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-semibold text-lg text-foreground">{place.placeName}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {place.place_details}
        </p>
        <h2 className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          Best time: {place.time_of_day}
        </h2>

        <h3 className="mt-2 flex items-center gap-1.5 text-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          Time required: {place.time_required}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Ticket className="h-3.5 w-3.5 shrink-0 text-primary" />
          Price: {place.ticket_pricing}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 shrink-0 text-primary" />
          Rating: {place.rating}
        </p>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
          <FaMapLocationDot className="mt-0.5 shrink-0 text-primary" />
          <span className="text-wrap">{place.placeAddress}</span>
        </p>

        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            place?.placeName +
            "," +
            place?.placeAddress
          }
          target="_blank"
          className="mt-auto inline-flex pt-3"
        >
          <Button className="cursor-pointer rounded-full px-3 text-xs" size="sm">
            <IoIosSend />
            View on Map
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCardItem;
