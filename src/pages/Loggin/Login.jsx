import React, { useState } from 'react';

import '../../Styles/Login.css';
import Logo from '../../assets/img/images.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  // ✅ handleSubmit ahora es async
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: username,
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setErrorMessage('');
        onLogin(data.usuario); // pasa el objeto usuario completo

        // onLogin(username); // ✅ accede a la app
      } else {
        // alert(data.message || 'Usuario o contraseña incorrectos');
        setErrorMessage(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // alert('Ocurrió un error al intentar iniciar sesión');
      setErrorMessage('Ocurrió un error al intentar iniciar sesión');

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
          <div className="password-input-container">
             <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <span
        className="password-toggle-icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>

          </div>
         

        {/* <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            marginBottom: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#444595",
            fontSize: "14px"
          }}
        >
          {showPassword ? "Ocultar" : "Mostrar"} contraseña
        </button> */}



          <button type="submit">Ingresar</button>
        </form>
        {errorMessage && (
          <div className="error-popup">
            {errorMessage}
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;






// import React from 'react'
// import React, { useState } from 'react';

// import '../../Styles/Login.css'
// import Logo from '../../assets/img/images.png'

// function Login({ onLogin }) {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     // Aquí después conectarás con tu backend
//     if (username && password) {
//       onLogin(username); // Por ahora simula que si escribe algo, se loguea
//     } else {
//       alert('Por favor ingresa usuario y contraseña');
//     }
//   };

//   return (
//     <div className='big-container'>
//       <div className="bienvenida">
//             <img src={Logo} alt="Logo de la empresa" className="logo-img" />
//             <h1 className='titulo'>Bienvenidos al Sistema</h1>
//       </div>

    
//     <div className="login-container">
//     <h2>Iniciar Sesión</h2>

//     <form onSubmit={handleSubmit}>
//     <label htmlFor="username">Usuario</label>
//       <input
//         type="text"
//         placeholder="Usuario"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//     <label htmlFor="password">Contraseña</label>
//       <input
//         type="password"
//         placeholder="Contraseña"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Ingresar</button>
//     </form>
//   </div>
//   </div>
// );
// };
// export default Login