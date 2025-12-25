import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-emerald-500'>Discover Your Next Adventure with AI: </span>
            Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating itineraies tailored to your interests and budget.</p>

            {/* since path is already created, we can use "to" syntax to redirect to the path*/}
            <Link to={'/create-trip'}>
            <Button> Get Started </Button>
            </Link>
    </div>
  )
}

export default Hero