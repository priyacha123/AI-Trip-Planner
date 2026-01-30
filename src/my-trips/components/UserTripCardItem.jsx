import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/home-trip.webp"}
          alt={trip?.userSelection?.location?.label}
          className="object-cover rounded-lg h-60 md:h-70 w-full"
        />
        <div className="pt-3 pl-1">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}{" "}
          </h2>
          <h2 className="text-sm text-gray-400">
            {trip?.userSelection?.total_days} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
