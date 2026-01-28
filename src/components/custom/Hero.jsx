import { useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Vortex } from '../ui/vortex'
import SignInDialog from './sign-in-dialog'

const Hero = () => {
  const [openDialog, setOpenDialog] = useState(false);
   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleViewTrips = () => {
    if (!user) {
      setOpenDialog(true);
    } else {
      navigate("/my-trips");
    }
  };


  return (
    <div className='flex flex-col items-center m-3 gap-3 justify-center h-150 '>
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >

        <h1 className='font-extrabold text-5xl lg:text-8xl md:text-6xl sm:text-5xl text-center mt-10'>
            <span className='text-white'>Discover Your Next Adventure with AI: </span>
        
            </h1>
            <h1 className='font-extrabold mt-7 text-2xl lg:text-5xl md:text-4xl sm:text-3xl text-center'> Personalized Itineraries at Your Fingertips</h1>
            <p className='lg:text-2xl text-md md:text-lg sm:text-md mt-4 text-gray-500 text-center'>Your personal trip planner and travel curator, creating itineraies tailored to your interests and budget.</p>

            {/* since path is already created, we can use "to" syntax to redirect to the path*/}
            <div className='flex gap-7 mt-5'>

            <Link to={'/create-trip'}>
            <Button className='mt-4 text-md'> Get Started </Button>
            </Link>
            <Button
            onClick={handleViewTrips}
             className='mt-4 text-md'> View your trips </Button>
            </div>
      </Vortex>
      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  )
}

export default Hero