import React, { useState } from 'react';
import "../Styles/TablaListadoFacturacion.css";

function TablaListadoFacturacion({ datos, onRowSelect }) {
    console.log("Datos recibidos", datos);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleRowClick = (item, index) => {
    setSelectedIndex(index);
    onRowSelect(item);
  };



  return (
   
    <div className="factura-table-container">
  <table className="factura-table">
    <thead>
      <tr>
        <th>Tipo Doc</th>
        <th>Sucursal</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th># Documento</th>
        <th>Cód Cliente</th>
        <th>Cliente</th>
        <th>Tasa</th>
        <th>Monto</th>
        <th>IVA</th>
        <th>IGTF</th>
        <th>Total</th>
        <th>Nula</th>
      </tr>
    </thead>
  </table>
  <div className="factura-table-body-scroll">
    <table className="factura-table">
    {console.log("Renderizando tabla con:", datos)}
      <tbody>
        {datos.length === 0 ? (
          <tr><td colSpan="13" style={{ textAlign: 'center' }}>Sin resultados</td></tr>
        ) : (
            datos.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item, index)}  className={`clickable-row ${selectedIndex === index ? 'selected-row' : ''}`}>
              <td>{item.tipoDocumento.toUpperCase()}</td>
              <td>{item.codigoSucursal.toUpperCase()}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>{item.numeroDocumento.replace(/\D/g, '')}</td>
              <td>{item.codigoCliente}</td>
              <td>{item.cliente}</td>
              <td>{item.tasa}</td>
              <td>{item.monto}</td>
              <td>{item.montoIVA}</td>
              <td>{item.igtf}</td>
              <td>{item.total}</td>
              <td>{item.nula ? 'Sí' : 'No'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default TablaListadoFacturacion;


