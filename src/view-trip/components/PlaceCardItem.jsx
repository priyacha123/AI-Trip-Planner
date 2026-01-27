import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    getPlacePhoto(`${place.placeName} ${place.placeAddress}`).then(setPhotoUrl);
  }, [place]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.placeName +
        "," +
        place?.placeAddress
      }
      target="_blank"
    >
      <div className="p-3 mt-2 rounded-xl gap-5 hover:shadow-md border hover:scale-105 transition-all cursor-pointer">
         <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/home-trip.webp"} />

         {/* </DirectionAwareHover> */}
        {/* <img
          src={photoUrl ? photoUrl : "/home-trip.webp"}
          alt=""
          className="w-full h-75 rounded-xl object-cover"
        /> */}
        <div className="p-1 flex flex-col gap-1 my-2">
          <h2 className="font-bold text-lg">{place.placeName} </h2>
          <p className="text-sm text-gray-400 line-clamp-2">{place.place_details} </p>
          <h2 className="font-medium mt-2 text-sm text-orange-600">
            Best time: {place.time_of_day}{" "}
          </h2>

          <h3 className="mt-2 mb-1">Time required: {place.time_required} </h3>
          <p className="mb-1 text-sm text-gray-400">
            Price: {place.ticket_pricing}{" "}
          </p>
          <p className="text-sm text-gray-400">Rating: {place.rating} </p>
          <Button className="mt-3 p-7 mb-1" size="sm">
            <FaMapLocationDot />
            <p className="text-sm text-gray-400 text-wrap">
              Address: {place.placeAddress}{" "}
            </p>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
