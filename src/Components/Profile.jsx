import React from 'react'
import '../Styles/Profile.css'
import { FaUserCircle } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";






function Profile({ user }) {
  return (
    <div className='profile'>
        <div className='img'>
        <FaUserCircle />
            

        </div>
        <div className='Contenido'>
            <h1 className='nombre'>{user?.nombre}</h1>

        </div>
        <div className='icon'>
        <IoLogOut />


        </div>
        
    </div>
  )
}

export default Profile

