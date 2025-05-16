import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {        
  faBell, 
  faCommentDots,          
  faSearch     
} from "@fortawesome/free-solid-svg-icons";
import user from '../images/download (2) 3.png'

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between items-center px-10 py-4 bg-[#D9D9D952] shadow-sm w-full'>
        <div className='flex items-center gap-2 bg-white px-3 py-2 rounded-full w-72'>
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder='Search' 
            className=' outline-none text-sm w-full'
          />
        </div>

      
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-4 text-gray-600'>
            <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5 cursor-pointer bg-white p-2 rounded-full hover:text-[#329D7F]" />
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 cursor-pointer bg-white p-2 rounded-full hover:text-[#329D7F]" />
          </div>
          <div className='flex items-center gap-3 border-l-2 border-[#908B8B52]'>
            <img src={user} alt="User" className='w-10 h-10 pl-2 rounded-full object-cover' />
            <div className='text-sm'>
              <span className='block font-semibold text-gray-700'>Username</span>
              <p className='text-gray-500 text-xs'>username@.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
