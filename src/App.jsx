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
  const [user, setUser] = useState(null);
  const [expandido, setExpandido] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleMenuSeleccionado = (menu) => {
    setMenuSeleccionado(menu);
    setSidebarVisible(true);  // Mostrar el sidebar secundario cuando se selecciona un menú
  };

  const closeSidebar = () => {
    setSidebarVisible(false);  // Cerrar el sidebar cuando se haga clic en una opción
  };
  

  const handleLogin = (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario)); 
  setUser(usuario);
  setIsAuthenticated(true);
   
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }


  return (
    <Router>
      <div className='App'>
        <SideBar setMenuSeleccionado={handleMenuSeleccionado} expandido={expandido}
          setExpandido={setExpandido} />
        {sidebarVisible && <SidebarSecundario menu={menuSeleccionado} closeSideSecundario={closeSidebar} expandido={expandido} className={sidebarVisible ? 'visible' : ''}  />}
        <div className={`dashboard ${expandido ? 'expandido' : 'contraido'}`}>
          <ContentHeader  user={user} onLogout={handleLogout}  />
          
          <Content />
        </div>
      </div>
    </Router>
    
  )
}

export default App
