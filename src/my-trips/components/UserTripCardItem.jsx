import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { getPlacePhoto } from "../../service/UnsplashApi";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

useEffect(() => {
  const fetchPhoto = async () => {
    try {
      const url = await getPlacePhoto(
        trip?.userSelection?.location?.label
      );
      setPhotoUrl(url);
    } catch (error) {
      console.error("Unsplash error:", error);
      setPhotoUrl(null);
    }
  };

  if (trip?.userSelection?.location?.label) {
    fetchPhoto();
  }
}, [trip]);


  // const GetPlacePhoto = async() => {
  //     const data = {
  //         textQuery:trip?.userSelection?.location?.label
  //     }
  //     const result = await GetPlaceDetails(data).then(resp=>{
  //         console.log(resp.data.places[0].photos[3].name);

  //         const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
  //         setPhotoUrl(PhotoUrl)

  //     })
  // }

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/home-trip.webp"}
          alt={trip?.userSelection?.location?.label}
          className="object-cover rounded-xl h-60 w-full"
        />
        <p className="text-xs text-gray-400 mt-1">Photo from Unsplash</p>

        <div className="mt-2">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}{" "}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.total_days} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
