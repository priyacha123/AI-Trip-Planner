import { Button } from '../../components/ui/button'
import { IoIosSend } from "react-icons/io"
// import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi'
import { useEffect, useState } from 'react'
import { getPlacePhoto } from '../../service/UnsplashApi'
import { DirectionAwareHover } from '../../components/ui/direction-aware-hover'
import { Link } from 'react-router-dom'
import { CalendarDays, Wallet, Users } from 'lucide-react'


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
   getPlacePhoto(trip.userSelection.location.label)
      .then(setPhotoUrl);
  }, [trip])

  return (


    <div>
      <DirectionAwareHover className='h-100' imageUrl={photoUrl ? photoUrl : "/hotel.webp"} />
        <h1 className="mt-5 text-sm text-muted-foreground">{trip?.tripData?.tripData?.trip_summary} </h1>

        <div className='flex justify-between items-center'>
             <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-semibold text-3xl text-foreground'>{trip?.userSelection?.location?.label}</h2>

            <div className='flex my-5 font-medium flex-col md:flex-row flex-wrap gap-3 md:gap-4'>
            <span className='inline-flex items-center gap-2 p-2 md:px-5 bg-muted rounded-full text-foreground text-sm'>
                <CalendarDays className='h-4 w-4 text-primary' />
                Total Days: {trip?.userSelection?.total_days} </span>

            <span className='inline-flex items-center gap-2 p-2 md:px-5 bg-muted rounded-full text-foreground text-sm'>
                <Wallet className='h-4 w-4 text-primary' />
                Budget Type: {trip?.userSelection?.budget}</span>

            <span className='inline-flex items-center gap-2 p-2 md:px-5 bg-muted rounded-full text-foreground text-sm'>
                <Users className='h-4 w-4 text-primary' />
                Number of travellers: {trip?.userSelection?.traveller}</span>
                        <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(trip?.userSelection?.location?.label)
      }
      target="_blank"
    >
         <Button className="rounded-full">
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