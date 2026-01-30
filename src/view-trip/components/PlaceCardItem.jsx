import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";
import { IoIosSend } from "react-icons/io";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    getPlacePhoto(`${place.placeName} ${place.placeAddress}`).then(setPhotoUrl);
  }, [place]);

  return (
    <div className="p-3 mt-2 bg-gray-200 text-black rounded-xl gap-5 hover:shadow-md border hover:scale-105 transition-all">
      <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/home-trip.webp"} />
      <div className="p-1 flex flex-col gap-1 my-2">
        <h2 className="font-bold text-lg">{place.placeName} </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {place.place_details}{" "}
        </p>
        <h2 className="font-medium mt-2 text-sm text-orange-600">
          Best time: {place.time_of_day}{" "}
        </h2>

        <h3 className="mt-2 mb-1">Time required: {place.time_required} </h3>
        <p className="mb-1 text-sm text-gray-600">
          Price: {place.ticket_pricing}{" "}
        </p>
        <p className="text-sm text-gray-600">Rating: {place.rating} </p>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            place?.placeName +
            "," +
            place?.placeAddress
          }
          target="_blank"
        >
          <Button className="mt-2 p-5 cursor-pointer" size="sm">
            <IoIosSend />
            View on Map
          </Button>
        </Link>
        <Button className="mt-3 p-7 mb-1" size="sm">
          <FaMapLocationDot className="text-blue-400" />
          <p className="text-sm text-cyan-100 text-wrap">
            Address: {place.placeAddress}{" "}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default PlaceCardItem;
