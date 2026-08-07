import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../service/UnsplashApi";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { DirectionAwareHover } from "../../components/ui/direction-aware-hover";
import { IoIosSend } from "react-icons/io";
import { Wallet, Star } from "lucide-react";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    getPlacePhoto(`${hotel.hotelName} hotel`).then(setPhotoUrl);
  }, [hotel]);

  return (
    <div>
        <div className="p-3 mt-2 bg-card/60 backdrop-blur-xl text-foreground rounded-2xl gap-5 hover:shadow-md border hover:border-primary/40 transition-all">
                   <DirectionAwareHover imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />

          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-semibold text-lg text-foreground"> {hotel.hotelName} </h2>
            <h2 className="text-sm text-muted-foreground line-clamp-3">
              {hotel.hotelDescription}{" "}
            </h2>
            <h2 className="text-sm text-muted-foreground flex items-center gap-1.5">
              {" "}
              <Wallet className="h-3.5 w-3.5 text-primary shrink-0" />
              Price range: {hotel.priceRange}{" "}
            </h2>
            <h2 className="text-sm text-muted-foreground flex items-center gap-1.5">
              {" "}
              <Star className="h-3.5 w-3.5 text-primary shrink-0" />
              Rating: {hotel.rating}{" "}
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
                     <Button className="mt-2 p-5 cursor-pointer rounded-full" size="sm">
                        <IoIosSend />
                        View on Map
                     </Button>
      </Link>
            <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5">
              <FaMapLocationDot className="text-primary mt-0.5 shrink-0" />
              <span className="text-wrap">{hotel.hotelAddress}</span>
            </p>
          </div>
        </div>
    </div>
  );
};

export default HotelCardItem;