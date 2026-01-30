import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";
import { IoIosSend } from "react-icons/io";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    getPlacePhoto(`${hotel.hotelName} hotel`).then(setPhotoUrl);
  }, [hotel]);

  return (
    <div>
        <div className="p-3 mt-2 bg-gray-200 text-black rounded-xl gap-5 hover:shadow-md border hover:scale-105 transition-all">
                   <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />
                   
          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium"> {hotel.hotelName} </h2>
            <h2 className="text-sm text-gray-600 line-clamp-3">
              {hotel.hotelDescription}{" "}
            </h2>
            <h2 className="text-sm text-gray-600">
              {" "}
              💰 Price range: {hotel.priceRange}{" "}
            </h2>
            <h2 className="text-sm text-gray-600">
              {" "}
              🌟 Rating: {hotel.rating}{" "}
            </h2>
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
                     <Button className="mt-2 p-5 cursor-pointer" size="sm">
                        <IoIosSend />
                        View on Map
                     </Button>
      </Link>
            <Button className="mt-2 p-7 mb-1" size="sm">
              <FaMapLocationDot className="text-blue-400" />
                          <p className="text-sm text-cyan-100 text-wrap">
                Address: {hotel.hotelAddress}{" "}
              </p>
            </Button>
          </div>
        </div>
    </div>
  );
};

export default HotelCardItem;
