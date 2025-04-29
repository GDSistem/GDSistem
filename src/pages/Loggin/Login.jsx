// import React from 'react'
import React, { useState } from 'react';

import '../../Styles/Login.css'
import Logo from '../../assets/img/images.png'

function Login({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();


    // Aquí después conectarás con tu backend
    if (username && password) {
      onLogin(username); // Por ahora simula que si escribe algo, se loguea
    } else {
      alert('Por favor ingresa usuario y contraseña');
    }
  };

  return (
    <div className='big-container'>
      <div className="bienvenida">
            <img src={Logo} alt="Logo de la empresa" className="logo-img" />
            <h1 className='titulo'>Bienvenidos al Sistema</h1>
      </div>

    
    <div className="login-container">
    <h2>Iniciar Sesión</h2>

    <form onSubmit={handleSubmit}>
    <label htmlFor="username">Usuario</label>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

    <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  </div>
  </div>
);
};
export default Login