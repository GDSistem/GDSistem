// import React from 'react'
import React, { useState, useEffect } from 'react'
import '../Styles/SideBarMenu.css';
import { FaChartBar } from 'react-icons/fa';
import { FaClipboardList } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { BiSolidBank } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BsBoxArrowInLeft } from "react-icons/bs";





import Logo from '../assets/img/images.png'


function SideMenu({setMenuSeleccionado, expandido, setExpandido}) {
    
      const menus = [
        { name: 'ventas', icon: <FaChartBar /> }, // Agregamos un ícono a cada menú
        { name: 'compras', icon: <FaCartShopping /> },
        { name: 'produccion', icon: <MdOutlineInventory /> },
        { name: 'inventario', icon: <FaArchive /> },
        { name: 'contabilidad', icon: <FaChartSimple /> },
        { name: 'bancos', icon: <BiSolidBank /> },
        { name: 'nomina', icon: <FaClipboardList /> },
        { name: 'parametros', icon: <FaFileLines /> },
        { name: 'seguridad', icon: <FaShieldAlt /> },
    ];

    
  return (
    <div className={`sideBar ${expandido ? 'expandido' : 'contraido'}`}>
      <div className="toggle-btn" onClick={() => setExpandido(!expandido)}>
        {expandido ? <BsBoxArrowInLeft /> : <BsBoxArrowInRight />}
      </div>

      {expandido && (
        <div className="logo">
          <img src={Logo} alt="Logo de la empresa" className="logo-img" />
        </div>
      )}
      {!expandido && (
      <div className="logo">
        <img src={Logo} alt="Logo de la empresa" className="logo-img" />
      </div>
    )}

      {menus.map((menu, index) => (
        <button 
          key={index} 
          className="sidebar-button"
          onClick={() => setMenuSeleccionado(menu.name)}
        >
          {menu.icon}
          {expandido && <span className="menu-text">{menu.name}</span>}
        </button>
      ))}
    </div>
  )
}

export default SideMenu


// import React, { useState } from 'react';
// import '../Styles/SideBarMenu.css';
// import { FaChartBar } from 'react-icons/fa';
// import { FaClipboardList } from "react-icons/fa";
// import { FaShieldAlt } from "react-icons/fa";
// import { FaArchive } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { FaChartSimple } from "react-icons/fa6";
// import { FaFileLines } from "react-icons/fa6";
// import { BiSolidBank } from "react-icons/bi";
// import { MdOutlineInventory } from "react-icons/md";
// import Logo from '../assets/img/images.png';
// import SidebarSecundario from './SidebarSecundario'; // Importar el submenú

// function SideMenu() {
//   const [menuSeleccionado, setMenuSeleccionado] = useState(null); // Estado para seleccionar el menú
//   const [isSideSecundarioVisible, setIsSideSecundarioVisible] = useState(true); // Estado para mostrar el submenú

//   const menus = [
//     { name: 'ventas', icon: <FaChartBar /> }, // Agregamos un ícono a cada menú
//     { name: 'compras', icon: <FaCartShopping /> },
//     { name: 'produccion', icon: <MdOutlineInventory /> },
//     { name: 'inventario', icon: <FaArchive /> },
//     { name: 'contabilidad', icon: <FaChartSimple /> },
//     { name: 'bancos', icon: <BiSolidBank /> },
//     { name: 'nomina', icon: <FaClipboardList /> },
//     { name: 'parametros', icon: <FaFileLines /> },
//     { name: 'seguridad', icon: <FaShieldAlt /> },
// ];

//   const handleMenuClick = (menu) => {
//     setMenuSeleccionado(menu);
//     setIsSideSecundarioVisible(true); // Mostrar submenú al hacer clic
//   };

//   return (
//     <div className='sideBar'>
//       <div className="logo">
//         <img src={Logo} alt="Logo de la empresa" className="logo-img" />
//       </div>

//       {menus.map((menu, index) => (
//         <button
//           key={index}
//           className="sidebar-button"
//           onClick={() => handleMenuClick(menu.name)}
//         >
//           {menu.icon}
//           {menu.name}
//         </button>
//       ))}

//       {/* Submenú que se muestra solo cuando se selecciona un menú */}
//       {isSideSecundarioVisible && (
//         <SidebarSecundario
//           menu={menuSeleccionado}
//           closeSideSecundario={() => setIsSideSecundarioVisible(false)} // Función para cerrar el submenú
//         />
//       )}
//     </div>
//   );
// }

// export default SideMenu;
