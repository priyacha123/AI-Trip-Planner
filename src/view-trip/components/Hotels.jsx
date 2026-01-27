import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({ trip }) => {
  return (
    <div>
        <h2 className='font-bold text-2xl mt-5'>Hotel Recommendation</h2>

        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {trip?.tripData?.hotels_options.map((hotel) => (
                 <HotelCardItem hotel={hotel} />
            ))}
        </div>
    </div>
  )
}

export default Hotels