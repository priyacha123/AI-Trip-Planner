import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    getPlacePhoto(`${hotel.hotelName} hotel`).then(setPhotoUrl);
  }, [hotel]);

  return (
    <div>
      <Link
        id={index}
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel?.hotelName +
          "," +
          hotel?.hotelAddress
        }
        target="_blank"
      >
        <div className="p-3 mt-2 rounded-xl gap-5 hover:shadow-md border hover:scale-105 transition-all cursor-pointer">
                   <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />
          {/* <img
            src={photoUrl ? photoUrl : "/hotel.webp"}
            alt="hotels"
            className="object-cover rounded-xl h-75 w-full"
          /> */}

          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium"> {hotel.hotelName} </h2>
            <h2 className="text-sm pb-2 text-gray-400 line-clamp-3">
              {" "}
              {hotel.hotelDescription}{" "}
            </h2>
            <h2 className="text-sm text-gray-400">
              {" "}
              💰 Price range: {hotel.priceRange}{" "}
            </h2>
            <h2 className="text-sm text-gray-400">
              {" "}
              🌟 Rating: {hotel.rating}{" "}
            </h2>
            <Button className="mt-3 p-7 mb-1" size="sm">
              <FaMapLocationDot />
              <p className="text-sm text-gray-400 text-wrap">
                📍 Address: {hotel.hotelAddress}{" "}
              </p>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
