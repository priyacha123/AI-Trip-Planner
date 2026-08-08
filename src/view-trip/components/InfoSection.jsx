import { useEffect, useState } from 'react'
import { getPlacePhoto } from '../../service/UnsplashApi'
import { DirectionAwareHover } from '../../components/ui/direction-aware-hover'
import { MapPin } from 'lucide-react'
import { HOTEL_FALLBACK } from '../../constants/images'

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    const query = trip?.userSelection?.location?.label;
    if (!query) return;
    let active = true;
    getPlacePhoto(query).then((url) => {
      if (active && url) setPhotoUrl(url);
    });
    return () => {
      active = false;
    };
  }, [trip])

  return (
    <DirectionAwareHover
      className="h-100 w-full rounded-2xl"
      imageUrl={photoUrl || HOTEL_FALLBACK}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md">
        <MapPin className="h-4 w-4" />
        {trip?.userSelection?.location?.label}
      </span>
    </DirectionAwareHover>
  )
}

export default InfoSection
