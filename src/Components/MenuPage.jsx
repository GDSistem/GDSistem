import React from 'react';
import { FaSearch } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import '../Styles/MenuPage.css';

const MenuPage = ({ onConsultar, onModificar, onNuevo, onAnular }) => {
  return (
    <div className="container-menu">
      <button className="consultar" onClick={onConsultar}>
        <FaSearch className='icon1' />
        <h3 className='tittle'>Consultar</h3>
      </button>

      <button className="modificar" onClick={onModificar}>
        <IoCreate className='icon2' />
        <h3 className='tittle'>Modificar</h3>
      </button>

      <button className="nuevo" onClick={onNuevo}>
        <FaPlus className='icon3' />
        <h3 className='tittle'>Nuevo</h3>
      </button>

      <button className="anular" onClick={onAnular}>
        <FaTrashAlt className='icon4' />
        <h3 className='tittle'>Anular</h3>
      </button>
    </div>
  );
}

export default MenuPage;
