import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";
import { IoIosSend } from "react-icons/io";
import { Clock, Ticket, Star } from "lucide-react";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    getPlacePhoto(`${place.placeName} ${place.placeAddress}`).then(setPhotoUrl);
  }, [place]);

  return (
    <div className="p-3 mt-2 bg-card/60 backdrop-blur-xl text-foreground rounded-2xl gap-5 hover:shadow-md border hover:border-primary/40 transition-all">
      <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/home-trip.webp"} />
      <div className="p-1 flex flex-col gap-1 my-2">
        <h2 className="font-semibold text-lg text-foreground">{place.placeName} </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {place.place_details}{" "}
        </p>
        <h2 className="font-medium mt-2 text-sm text-primary flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          Best time: {place.time_of_day}{" "}
        </h2>

        <h3 className="mt-2 mb-1 text-foreground flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          Time required: {place.time_required}
        </h3>
        <p className="mb-1 text-sm text-muted-foreground flex items-center gap-1.5">
          <Ticket className="h-3.5 w-3.5 text-primary shrink-0" />
          Price: {place.ticket_pricing}{" "}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-primary shrink-0" />
          Rating: {place.rating}
        </p>
        <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5">
          <FaMapLocationDot className="text-primary mt-0.5 shrink-0" />
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
        >
          <Button className="mt-2 p-5 cursor-pointer rounded-full" size="sm">
            <IoIosSend />
            View on Map
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCardItem;