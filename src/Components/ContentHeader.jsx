import React, { useState, useEffect } from 'react'
import '../Styles/ContentHeader.css';
import Profile from './Profile';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

function ContentHeader() {

  // const [user, setUser] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  // const navigate = useNavigate();

  // // Cargar el usuario desde el localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     console.log('Usuario desde localStorage:', storedUser);
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // // Manejar el cierre de sesión
  // const handleLogout = () => {
  //   localStorage.removeItem('user'); // Eliminar el usuario del localStorage
  //   navigate('/login'); // Redirigir a la página de login
  // };

  // // Toggle para mostrar/ocultar el modal
  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };
  return (
    <div className='header'>
        <SearchBar/>
        <Profile/>

    </div>
    // <div className="content-header">
    //   {user && (
    //     <div className="user-info">
    //       <Profile user={user} toggleModal={toggleModal} />
    //     </div>
    //   )}

    //   {/* Modal de cerrar sesión */}
    //   {modalVisible && (
    //     <div className="modal-logout">
    //       <button onClick={handleLogout}>Cerrar sesión</button>
    //     </div>
    //   )}
    // </div>
  )
}

export default ContentHeader