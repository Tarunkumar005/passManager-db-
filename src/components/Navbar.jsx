import React from 'react'

const Navbar = ({online, setOnline}) => {
  return (
    <>
        <div className="fixed z-50 top-0 bg-black w-full flex justify-center items-center py-1">
          <div className="logo font-bold text-white text-xl lg:text-4xl">Pass<span className='text-gray-600'>Manager</span></div>
          <div className='fixed right-2 flex gap-2 items-center'>
            <p className='text-white text-xs hidden sm:block'>{online}</p>
            <button className='text-white text-xs lg:text-sm ' title='Log Out' onClick={()=>{setOnline("")}}>
              <lord-icon
                src="https://cdn.lordicon.com/gwvmctbb.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#fff,secondary:#fff">
              </lord-icon>
            </button>
          </div>
        </div>
    </>
  )
}

export default Navbar