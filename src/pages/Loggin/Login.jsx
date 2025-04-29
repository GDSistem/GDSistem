// import React from 'react'
import React, { useState } from 'react';

import '../../Styles/Login.css'

function Login({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();


    // const user = {
    //   nombre: 'Juan Pérez', // Aquí podrías obtenerlo del backend
    //   cargo: 'Gerente', // Igual que el nombre, lo puedes obtener del backend
    // };

    // // Si hay username y password, simula login
    // if (username && password) {
    //   localStorage.setItem('user', JSON.stringify(user)); // Guardar datos en el localStorage
    //   onLogin(); // Llamar a la función onLogin para redirigir al dashboard o realizar cualquier otra acción
    // } else {
    //   alert('Por favor ingresa usuario y contraseña');
    // }

 

    // Aquí después conectarás con tu backend
    if (username && password) {
      onLogin(username); // Por ahora simula que si escribe algo, se loguea
    } else {
      alert('Por favor ingresa usuario y contraseña');
    }
  };
  return (
    <div className="login-container">
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  </div>
);
};
export default Login