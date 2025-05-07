import React from 'react'
import '../Styles/Profile.css'
import { FaUserCircle } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";






function Profile({ user, onLogout }) {

  const handleLogoutClick = () => {
    onLogout(); // Llama a la función de logout
    alert('Sesión cerrada con éxito'); // Mensaje de cierre de sesión
  };

  return (
    <div className='profile'>
        <div className='img'>
        <FaUserCircle />
            

        </div>
        <div className='Contenido'>
            <h1 className='nombre'>{user?.nombre}</h1>

        </div>
        <div className='icon' onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
        <IoLogOut />


        </div>
        
    </div>
  )
}

export default Profile

