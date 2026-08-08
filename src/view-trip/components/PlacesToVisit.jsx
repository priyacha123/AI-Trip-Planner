import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className='font-serif text-2xl font-normal text-foreground'>Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary.map((item, i) => (
          <div key={item?.day ?? i} className='mt-6'>
            <h2 className='font-medium text-lg text-foreground'>Day-{item.day} (Theme: {item.day_theme})</h2>
            <h2 className='font-medium text-sm text-muted-foreground'>Best time to visit: {item.best_time_to_visit}</h2>

            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {item.plan.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
