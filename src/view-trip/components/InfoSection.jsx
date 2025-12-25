import { Button } from '../../components/ui/button'
import { IoIosSend } from "react-icons/io"
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi'
import { useEffect, useState } from 'react'


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
   trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log("photos resp.data",resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].places[3].name)

      console.log("PhotoUrl",PhotoUrl);
      setPhotoUrl("PhotoUrl",PhotoUrl);
      
      
    })
  }
  return (
    <div>

         <img src={photoUrl?photoUrl: "/home-trip.webp"} alt="" className='h-[340px] w-full object-cover rounded' />
        <h1 className="mt-5 text-sm text-gray-300">{trip?.tripData?.tripData?.trip_summary} </h1>

        <div className='flex justify-between items-center'>
             <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>

            <div className='flex my-5 flex-col gap-5 '>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                📅
                {trip?.userSelection?.total_days} Days</h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                💰
                {trip?.userSelection?.budget} Budget</h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                🥂 Number of traveller: {trip?.userSelection?.traveller}</h2>
            </div>
         </div>
         <Button>
            <IoIosSend />
         </Button>
        </div>
    </div>
  )
}

export default InfoSection