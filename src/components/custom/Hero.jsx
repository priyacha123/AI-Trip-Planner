import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Vortex } from '../ui/vortex'

const Hero = () => {
  return (
    <div className='flex flex-col items-center m-3 gap-3 justify-center h-150 '>
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >

        <h1 className='font-extrabold text-8xl text-center mt-10'>
            <span className='text-white'>Discover Your Next Adventure with AI: </span>
        
            </h1>
            <h1 className='font-extrabold mt-7 text-6xl text-center'> Personalized Itineraries at Your Fingertips</h1>
            <p className='text-2xl mt-4 text-gray-500 text-center'>Your personal trip planner and travel curator, creating itineraies tailored to your interests and budget.</p>

            {/* since path is already created, we can use "to" syntax to redirect to the path*/}
            <div className='flex gap-7 mt-5'>

            <Link to={'/create-trip'}>
            <Button className='mt-4 text-md'> Get Started </Button>
            </Link>
            <Link to={'/my-trips'}>
            <Button className='mt-4 text-md'> View your trips </Button>
            </Link>
            </div>
      </Vortex>
    </div>
  )
}

export default Hero