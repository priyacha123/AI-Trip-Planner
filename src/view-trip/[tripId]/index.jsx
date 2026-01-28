import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true);


const GetTripData = async () => {
  try {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast.message("No Trip Found.");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


//   used to get trip info from firebase
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  if (loading) {
  return (
    <div className="p-10 text-center text-gray-400">
      Loading trip details...
    </div>
  );
}


  return (
    <div className="p-10 bg-neutral-300 text-black md:px-20 lg:px-44 xl:px-56">
        <h1 className="font-bold text-5xl mb-5">{trip?.tripData?.tripData?.trip_title} </h1>
        {/* info section */}
        <InfoSection trip={trip} />

        {/* recommendation section */}
        <Hotels trip={trip?.tripData} />

        {/* Daily plan */}
        <PlacesToVisit trip={trip?.tripData} />
        {/* Footer */}
        <Footer />


    </div>
  );
};

export default Viewtrip;
