import React from 'react'
import { Link } from 'react-router-dom'

const Home2 = () => {
  return (
    <>  
        <video className="fixed top-0 left-0 h-full w-full object-cover -z-10 bg-black my-auto"  src="/video/backgroundvideo.mp4"  autoPlay  loop  muted  playsInline/>
        <div className='conatiner w-full flex justify-center mt-[10%]'>
            <p className='text-white text-xl lg:text-4xl font-bold'>Welcome to</p>
            <p className="logo font-bold text-white text-xl lg:text-4xl ml-2">Pass</p>
            <p className='text-gray-600 font-bold text-xl lg:text-4xl'>Manager</p>
        </div>
        <div className='conatiner w-full mt-10 text-white text-center'>
            <p>New user ?<Link to="/signup" className='text-blue-600 ml-2'>Sign Up</Link></p>
            <p>Already have an account ?<Link to="/login" className='text-blue-600 ml-2'>Log In</Link></p>
        </div>
    </>
  )
}

export default Home2