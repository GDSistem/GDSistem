import React, { useState } from 'react';
import "../Styles/InfoDespachoVentas.css";

function InfoDespachoVentas({ despacho, sucursal }) {
    if (!despacho) return <div> </div>;

    const [activeTab, setActiveTab] = useState('Otro');
    

    
    const renderContent = () => {
    switch (activeTab) {
      case 'Cliente':
        return (
          <>
          
           <div className="info-columns">
            <div className="info-left">
            <p><strong>Dirección:</strong> {despacho.Direccion}</p>
            <p><strong>Ciudad:</strong> {despacho.Ciudad}</p>
            <p><strong>Estado:</strong> {despacho.Estado}</p>
            </div>
            <div className="info-right">
            <p><strong>País:</strong> {despacho.Pais}</p>
            <p><strong>Teléfono 1:</strong> {despacho.Telefono1}</p>
            <p><strong>Teléfono 2:</strong> {despacho.Telefono2}</p>
            </div>
        </div>
            
          </>
        );
      case 'Sucursal':
         if (!sucursal) {
    return <p>No hay información de sucursal disponible.</p>;
  }
        return (
          <>
        

        <div className="info-columns">
            <div className="info-left">
            <p><strong>Dirección:</strong> {sucursal.Direccion}</p>
            <p><strong>Ciudad:</strong> {sucursal.Ciudad}</p>
            <p><strong>Estado:</strong> {sucursal.Estado}</p>
            </div>
            <div className="info-right">
            <p><strong>País:</strong> {sucursal.Pais}</p>
            <p><strong>Teléfono 1:</strong> {sucursal.Telefono1}</p>
            <p><strong>Teléfono 2:</strong> {sucursal.Telefono2}</p>
            </div>
        </div>
            
           
          </>
        );
      case 'Otro':
      default:
        return (
          <>
 
             <div className="info-columns">
            <div className="info-left">
            <p><strong>Dirección:</strong> {despacho.DireccionD}</p>
            <p><strong>Ciudad:</strong> {despacho.CiudadD}</p>
            <p><strong>Estado:</strong> {despacho.EstadoD}</p>
            </div>
            <div className="info-right">
            <p><strong>País:</strong> {despacho.PaisD}</p>
            <p><strong>Teléfono 1:</strong> {despacho.Telefono1D}</p>
            <p><strong>Teléfono 2:</strong> {despacho.Telefono2D}</p>
            </div>
        </div>
          </>
        );
    }
  };
console.log("Datos de despacho:", despacho);
console.log('informacion sucursar despacho', sucursal )


  return (
   <div className="despacho-info">
    <div><h3 className='titulodespacho'>Información de Despacho</h3></div>
    
      <div className="tabs">
        <button
          className={activeTab === 'Cliente' ? 'active' : ''}
          onClick={() => setActiveTab('Cliente')}
        >
          Cliente
        </button>
        <button
          className={activeTab === 'Sucursal' ? 'active' : ''}
          onClick={() => setActiveTab('Sucursal')}
        >
          Sucursal
        </button>
        <button
          className={activeTab === 'Otro' ? 'active' : ''}
          onClick={() => setActiveTab('Otro')}
        >
          Otro
        </button>
      </div>

      <div className="despacho-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default InfoDespachoVentas