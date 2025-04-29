import React from 'react'
import '../Styles/Profile.css'
import { FcOnlineSupport } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";




function Profile() {
  return (
    <div className='profile'>
        <div className='img'>
        <FcOnlineSupport />
            

        </div>
        <div className='Contenido'>
            <h1 className='nombre'>Giovanna Cianfaglione</h1>
            <h4 className='cargo'>Programador</h4>

        </div>
        <div className='icon'>
        <FaChevronDown />


        </div>
        
    </div>
  )
}

export default Profile



// function Profile({ user, toggleModal }) {
//   return (
//     <div className='profile'>
//         <div className='img'>
//         <FcOnlineSupport />
            

//         </div>
//         <div className='Contenido'>

//           {user && (
//             <>
//               <h1 className='nombre'>{user.nombre}</h1>
//               <h4 className='cargo'>{user.cargo}</h4>
//             </>
//           )}

//             {/* <h1 className='nombre'>Giovanna Cianfaglione</h1>
//             <h4 className='cargo'>Programador</h4> */}

//         </div>
//         <div className='icon'>
//         <FaChevronDown onClick={toggleModal} />


//         </div>
        
//     </div>
//   )
// }

// export default Profile