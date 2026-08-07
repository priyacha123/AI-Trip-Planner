import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({ trip }) => {
  return (
    <div>
        <h2 className='font-serif text-2xl font-normal text-foreground mt-5'>Hotel Recommendation</h2>

        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {trip?.tripData?.hotels_options.map((hotel, index) => (
                 <HotelCardItem hotel={hotel} key={index} />
            ))}
        </div>
    </div>
  )
}

export default Hotels