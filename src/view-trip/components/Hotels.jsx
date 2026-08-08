import React from 'react'
import HotelCardItem from './HotelCardItem'
import { BedDouble } from 'lucide-react'

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData?.hotels_options;

  if (!hotels?.length) return null;

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <BedDouble className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-2xl font-normal text-foreground">Recommended stays</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Hotels
