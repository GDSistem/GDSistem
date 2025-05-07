import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import '../Styles/MenuPage.css'




function MenuPage() {
  return (
    <div className='container-menu'>
        <div className='consultar'>
            <FaSearch  className='icon1'/>
            <h3 className='tittle'>Consultar</h3>

        </div>
        <div className='modificar'>
            <IoCreate className='icon2' />
            <h3 className='tittle'>Modificar</h3>
            
        </div>
        <div className='nuevo'>
            <FaPlus className='icon3' />
            <h3 className='tittle'>Nuevo</h3>

        </div>
        <div className='anular'>
            <FaTrashAlt className='icon4'  />
            <h3 className='tittle'>Anular</h3>

        </div>

    </div>
  )
}

export default MenuPage