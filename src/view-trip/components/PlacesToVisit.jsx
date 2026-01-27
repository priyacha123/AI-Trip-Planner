import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
        <h2 className='mt-10 font-bold text-lg'>Places to Visit</h2>

        <div>
            {trip?.tripData?.itinerary.map((item) => {
                return <div className='mt-5'>
                    <h2 className='font-medium text-lg'>Day-{item.day} (Theme: {item.day_theme})</h2>
                            <h2 className='font-medium text-sm text-gray-400'>Best time to visit: {item.best_time_to_visit} </h2>

                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {item.plan.map((place, index) => (
                        <div id={index} className='my-3'>
                            <PlaceCardItem place={place} />
                        </div>
                    ))}
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default PlacesToVisit