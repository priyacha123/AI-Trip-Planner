import { Button } from '../../components/ui/button'
import { IoIosSend } from "react-icons/io"
// import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi'
import { useEffect, useState } from 'react'
import { getPlacePhoto } from '../../service/UnsplashApi'
import { DirectionAwareHover } from '../../components/ui/direction-aware-hover'


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
   getPlacePhoto(trip.userSelection.location.label)
      .then(setPhotoUrl);
  }, [trip])

  // const GetPlacePhoto = async() => {
  //   const data = {
  //     textQuery:trip?.userSelection?.location?.label
  //   }
  //   const result = await GetPlaceDetails(data).then(resp => {
  //     console.log("photos resp.data",resp.data.places[0].photos[3].name);

  //     const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].places[3].name)

  //     console.log("PhotoUrl",PhotoUrl);
  //     setPhotoUrl(PhotoUrl);
      
      
  //   })
  // }

  return (
    <div>
      <DirectionAwareHover className='h-100' imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />
         {/* <img src={photoUrl?photoUrl: "/home-trip.webp"} alt="" className='h-[340px] w-full object-cover rounded' /> */}
        <h1 className="mt-5 text-sm text-gray-300">{trip?.tripData?.tripData?.trip_summary} </h1>

        <div className='flex justify-between items-center'>
             <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-3xl'>{trip?.userSelection?.location?.label}</h2>

            <div className='flex my-5 font-bold flex-row gap-10 '>
            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-black text-sm'>
                📅 Total Days: {trip?.userSelection?.total_days} </h2>

            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-black text-sm'>
                💰 Budget Type: {trip?.userSelection?.budget}</h2>

            <h2 className='p-2 px-5 bg-gray-200 rounded-full text-black text-sm'>
                👥 Number of travellers: {trip?.userSelection?.traveller}</h2>
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