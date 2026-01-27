import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfi";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid mt-10 grid-cols-2 md:grid-cols-3 gap-5">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="h-60 w-full bg-slate-200 animate-pulse rounded-xl"
              />
            ))
          : userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))
          : (
              <p className="text-gray-400 col-span-full text-center">
                No trips found
              </p>
            )}
      </div>
    </div>
  );
};

export default MyTrips;
