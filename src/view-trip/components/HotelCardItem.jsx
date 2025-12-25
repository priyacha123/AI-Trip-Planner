import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi'

const HotelCardItem = ({ hotel, index, trip }) => {

    const [photoUrl, setPhotoUrl] = useState()
    
      useEffect(() => {
       hotel && GetPlacePhoto();
      }, [hotel])
    
      const GetPlacePhoto = async() => {
        const data = {
          textQuery:hotel?.hotelName
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
        <Link id={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>

            <div className='hover:scale-105 transition-all cursor-pointer' >
                    <img src={photoUrl?photoUrl: "/home-trip.webp"} alt="hotels" className='object-cover rounded-xl h-50 w-full' />

                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'> {hotel.hotelName} </h2>
                        <h2 className='text-xs text-gray-500'> {hotel.hotelDescription} </h2>
                        <h2 className='text-xs text-gray-500'> 📍 {hotel.hotelAddress} </h2>
                        <h2 className='text-sm'> 💰 {hotel.priceRange} </h2>
                        <h2 className='text-sm'> 🌟 {hotel.rating} </h2>
                    </div>
                </div>
                </Link>
    </div>
  )
}

export default HotelCardItem