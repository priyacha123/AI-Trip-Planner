import { Button } from '../../components/ui/button'
import { IoIosSend } from "react-icons/io"
// import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi'
import { useEffect, useState } from 'react'
import { getPlacePhoto } from '../../service/UnsplashApi'
import { DirectionAwareHover } from '../../components/ui/direction-aware-hover'
import { Link } from 'react-router-dom'


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
   getPlacePhoto(trip.userSelection.location.label)
      .then(setPhotoUrl);
  }, [trip])

  return (


    <div>
      <DirectionAwareHover className='h-100' imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />
        <h1 className="mt-5 text-sm text-gray-600">{trip?.tripData?.tripData?.trip_summary} </h1>

        <div className='flex justify-between items-center'>
             <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-3xl'>{trip?.userSelection?.location?.label}</h2>

            <div className='flex my-5 font-bold flex-col md:flex-row gap-10 '>
            <h2 className='p-2 md:px-5 bg-gray-200 rounded md:rounded-2xl  text-black text-sm'>
                📅 Total Days: {trip?.userSelection?.total_days} </h2>

            <h2 className='p-2 md:px-5 bg-gray-200 rounded md:rounded-2xl  text-black text-sm'>
                💰 Budget Type: {trip?.userSelection?.budget}</h2>

            <h2 className='p-2 md:px-5 bg-gray-200 rounded md:rounded-2xl  text-black text-sm'>
                👥 Number of travellers: {trip?.userSelection?.traveller}</h2>
                        <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(trip?.userSelection?.location?.label)
      }
      target="_blank"
    >
         <Button>
            <IoIosSend />
         </Button>
        </Link>
            </div>
         </div>
        </div>
    </div>

  )
}

export default InfoSection