import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './Components/SideMenu';
import SidebarSecundario from './Components/SidebarSecundario';
import Content from './Components/Content';
import ContentHeader from './Components/ContentHeader';
import Login from './pages/Loggin/Login';

import './App.css'

const App = () => {
  const [menuSeleccionado, setMenuSeleccionado] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false); // Estado para mostrar/ocultar el SideBarSecundario

  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  // Si ya está logueado (localStorage), actualiza estado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      
    }
  }, []);

  const handleMenuSeleccionado = (menu) => {
    setMenuSeleccionado(menu);
    setSidebarVisible(true);  // Mostrar el sidebar secundario cuando se selecciona un menú
  };

  const closeSidebar = () => {
    setSidebarVisible(false);  // Cerrar el sidebar cuando se haga clic en una opción
  };
  
  const handleLogin = (username) => {
    // Aquí luego llamarás a tu API real
    localStorage.setItem('user', username); 
    setIsAuthenticated(true);
   
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
   
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }



  return (
    <Router>
      <div className='App'>
        <SideBar setMenuSeleccionado={handleMenuSeleccionado} />
        {sidebarVisible && <SidebarSecundario menu={menuSeleccionado} closeSideSecundario={closeSidebar} className={sidebarVisible ? 'visible' : ''}  />}
        <div className='dashboard'>
          <ContentHeader  onLogout={handleLogout}  />
          
          <Content />
        </div>
      </div>
    </Router>
    
  )
}

export default App
