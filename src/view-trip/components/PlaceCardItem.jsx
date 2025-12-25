import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

const PlaceCardItem = ({ place }) => {

      const [photoUrl, setPhotoUrl] = useState()
      
        useEffect(() => {
         place && GetPlacePhoto();
        }, [place])
      
        const GetPlacePhoto = async() => {
          const data = {
            textQuery:place?.placeName
          }
          const result = await GetPlaceDetails(data).then(resp => {
            console.log("photos resp.data",resp.data.places[0].photos[3].name);
      
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].places[3].name)
      
            console.log("PhotoUrl",PhotoUrl);
            setPhotoUrl("PhotoUrl",PhotoUrl);
          })
        }

  return (
    <Link 
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName+","+place?.placeAddress}
      target="_blank"
    >
      <div className="p-3 mt-2 rounded-xl gap-5 hover:shadow-md border hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl?photoUrl: "/home-trip.webp"} alt="" className="w-full h-55 rounded-xl object-cover" />
        <div className="p-1">
          <h2 className="font-bold text-lg">{place.placeName} </h2>
          <p className="text-sm text-gray-400">{place.place_details} </p>
          <h2 className="font-medium mt-2 text-sm text-orange-600">
            Best time: {place.time_of_day}{" "}
          </h2>

          <h3 className="mt-2 mb-1">Time required:  {place.time_required} </h3>
          <p className="mb-1 text-sm text-gray-400">
            Price: {place.ticket_pricing}{" "}
          </p>
          <p className="text-sm text-gray-400">
            Rating: {place.rating}{" "}
          </p>
          <Button className="mt-3 mb-1" size="sm">
            <FaMapLocationDot />
          <p className="text-sm text-gray-400 text-wrap">Address: {place.placeAddress} </p>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
