// import React from 'react'
// import "../Styles/TablaListadoFacturacion.css"

// function TablaListadoFcaturacion({ data }) {
//   return (
//     <div className="factura-table-container">
//       <table className="factura-table">
//         <thead>
//           <tr>
//             <th>Tipo Doc</th>
//             <th>Sucursal</th>
//             <th>Fecha</th>
//             <th>Hora</th>
//             <th># Documento</th>
//             <th>Cód Cliente</th>
//             <th>Cliente</th>
//             <th>Tasa</th>
//             <th>Monto</th>
//             <th>IVA</th>
//             <th>IGTF</th>
//             <th>Total</th>
//             <th>Nula</th>
//             {/* <th>Cliente Pag</th>
//             <th>Producto</th>
//             <th>Despacho</th> */}

//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr><td colSpan="13" style={{ textAlign: 'center' }}>Sin resultados</td></tr>
//           ) : (
//             data.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.tipoDocumento}</td>
//                 <td>{item.codigoSucursal}</td>
//                 <td>{item.fecha}</td>
//                 <td>{item.hora}</td>
//                 <td>{item.numeroDocumento}</td>
//                 <td>{item.codigoCliente}</td>
//                 <td>{item.cliente}</td>
//                 <td>{item.tasa}</td>
//                 <td>{item.monto}</td>
//                 <td>{item.montoIVA}</td>
//                 <td>{item.igtf}</td>
//                 <td>{item.total}</td>
//                 <td>{item.nula ? 'Sí' : 'No'}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
// );
// }

// export default TablaListadoFcaturacion

// import React, { useState } from 'react';
// import "../Styles/TablaListadoFacturacion.css";

// function TablaListadoFacturacion({ data }) {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [clienteInfo, setClienteInfo] = useState(null);
//   const [despachoInfo, setDespachoInfo] = useState(null);

//   const handleRowClick = (item) => {
//     setSelectedItem(item);

//     // Aquí puedes hacer el fetch real cuando tengas los endpoints.
//     // Simulamos la respuesta:
//     setClienteInfo({
//       codigo: item.codigoCliente,
//       nombre: item.cliente,
//       direccion: "Calle Falsa 123",
//       telefono: "0412-1234567"
//     });

//     setDespachoInfo({
//       numeroDespacho: "D-" + item.numeroDocumento,
//       fechaDespacho: item.fecha,
//       status: "Entregado"
//     });
//   };

//   return (
//     <div className="factura-table-container">
//       <table className="factura-table">
//         <thead>
//           <tr>
//             <th>Tipo Doc</th>
//             <th>Sucursal</th>
//             <th>Fecha</th>
//             <th>Hora</th>
//             <th># Documento</th>
//             <th>Cód Cliente</th>
//             <th>Cliente</th>
//             <th>Tasa</th>
//             <th>Monto</th>
//             <th>IVA</th>
//             <th>IGTF</th>
//             <th>Total</th>
//             <th>Nula</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr><td colSpan="13" style={{ textAlign: 'center' }}>Sin resultados</td></tr>
//           ) : (
//             data.map((item, index) => (
//               <tr key={index} onClick={() => handleRowClick(item)} className="clickable-row">
//                 <td>{item.tipoDocumento}</td>
//                 <td>{item.codigoSucursal}</td>
//                 <td>{item.fecha}</td>
//                 <td>{item.hora}</td>
//                 <td>{item.numeroDocumento}</td>
//                 <td>{item.codigoCliente}</td>
//                 <td>{item.cliente}</td>
//                 <td>{item.tasa}</td>
//                 <td>{item.monto}</td>
//                 <td>{item.montoIVA}</td>
//                 <td>{item.igtf}</td>
//                 <td>{item.total}</td>
//                 <td>{item.nula ? 'Sí' : 'No'}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Mostrar info del cliente */}
//       {clienteInfo && (
//         <div className="cliente-info">
//           <h3>Información del Cliente</h3>
//           <p><strong>Código:</strong> {clienteInfo.codigo}</p>
//           <p><strong>Nombre:</strong> {clienteInfo.nombre}</p>
//           <p><strong>Dirección:</strong> {clienteInfo.direccion}</p>
//           <p><strong>Teléfono:</strong> {clienteInfo.telefono}</p>
//         </div>
//       )}

//       {/* Mostrar info del despacho */}
//       {despachoInfo && (
//         <div className="despacho-info">
//           <h3>Información del Despacho</h3>
//           <p><strong>Número:</strong> {despachoInfo.numeroDespacho}</p>
//           <p><strong>Fecha:</strong> {despachoInfo.fechaDespacho}</p>
//           <p><strong>Estado:</strong> {despachoInfo.status}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TablaListadoFacturacion;

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
              <td>{item.tipoDocumento}</td>
              <td>{item.codigoSucursal}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>{item.numeroDocumento}</td>
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


