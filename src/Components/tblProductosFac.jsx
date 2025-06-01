
// import React, { useState } from 'react';

// import '../Styles/tblProductosFac.css'

// function tblProductosFac({ productos }) {
//     const [expandedRows, setExpandedRows] = useState([]);
//     const toggleRow = (id) => {
//         setExpandedRows((prev) =>
//           prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//         );
//       };

    
//   return (
// <div className='ContenedorGrand'>
// <div className="Producto-titulo">
//      <h3 className="Title">Información de los Productos</h3>
//     </div>

// <div className="table-container">
    
//   <table className="product-table">
//     <thead>
//       <tr>
//         <th></th>
//         <th>Item</th>
//         <th>Codigo</th>
//         <th>Producto</th>
//         <th>Corte</th>
//         <th>Subproducto</th>
//         <th>Lista</th>
//         <th>Cantidad</th>
//         <th>Pendiente</th>
//         <th>Prend. Producir</th>
//         <th>Disponible</th>
//         <th>Unidad</th>
//         <th>Ancho</th>
//         <th>Alto</th>
//         <th>Largo</th>
//         <th>Total Medida</th>
//         <th>Precio</th>
//         <th>Descuento</th>
//         <th>Dscto Adicional</th>
//         <th>Desperdicio</th>
//         <th>Riesgo</th>
//         <th>Total Base</th>
//         <th>Tasa Iva</th>
//         <th>Total Iva</th>
//         <th>Forma</th>
//         <th>Orden Compra</th>
//         <th>Peso</th>
//         <th>Total Peso</th>
//         <th>Redondea5</th>
//         <th>Tipo Iva</th>
//         <th>Tipo Patente</th>
//         <th>Tasa Patente</th>
//         <th>Total Patente</th>
//       </tr>
//     </thead>
//   </table>

//   <div className="table-body-container">
//     <table className="product-table">
//       <tbody>
//         {productos.map((producto) => (
//           <React.Fragment key={producto.IdVentaDet}>
//             <tr className="product-row">
//               <td>
//                 <button
//                   className={`expand-btn ${expandedRows.includes(producto.IdVentaDet) ? 'rotate' : ''}`}
//                   onClick={() => toggleRow(producto.IdVentaDet)}
//                 >
//                   ▶
//                 </button>
//               </td>
//               <td>{producto.Item}</td>
//               <td>{producto.CodProducto}</td>
//               <td>{producto.NomProducto}</td>
//               <td>{"NH Corte"}</td>
//               <td>{producto.NomSubProducto}</td>
//               <td>{producto.CodListaPrecios}</td>
//               <td>{producto.Cantidad}</td>
//               <td>{producto.Pendiente}</td>
//               <td>{producto.PendProducir}</td>
//               <td>{"NH Disponible"}</td>
//               <td>{producto.NomUnidadMedida}</td>
//               <td>{producto.Ancho}</td>
//               <td>{producto.Alto}</td>
//               <td>{producto.Largo}</td>
//               <td>{"Total Medida"}</td>
//               <td>{producto.Precio}</td>
//               <td>{producto.Descuento}</td>
//               <td>{producto.DescuentoA}</td>
//               <td>{producto.Desperdicio}</td>
//               <td>{producto.Desperdicio}</td>
//               <td>{"Riesgo"}</td>
//               <td>{producto.TotalBase}</td>
//               <td>{producto.TasaIva}</td>
//               <td>{producto.TotalIva}</td>
//               <td>{producto.TotalBase}</td>
//               <td>{producto.Redondea5}</td>
//               <td>{"Tipo Iva"}</td>
//               <td>{producto.CodTipoPatente}</td>
//               <td>{producto.TasaPatente}</td>
//               <td>{producto.TasaPatente}</td>
//               <td>{"Total patente"}</td>
//             </tr>
//             {expandedRows.includes(producto.IdVentaDet) && (
//               <tr className="details-row">
//                 <td colSpan="32">
//                   Detalles extra del producto...
//                 </td>
//               </tr>
//             )}
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
// </div>

// );
   
  
// }

// export default tblProductosFac;


import React, { useState } from 'react';
import '../Styles/tblProductosFac.css';

function TblProductosFac({ productos }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className='ContenedorGrand'>
      <div className="Producto-titulo">
        <h3 className="Title">Información de los Productos</h3>
      </div>

      <div className="table-container">
        <div className="table-outer-container">
        <div className="table-inner-scroll">
        <table className="product-table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Corte</th>
              <th>Subproducto</th>
              <th>Lista</th>
              <th>Cantidad</th>
              <th>Pendiente</th>
              <th>Prend. Producir</th>
              <th>Disponible</th>
              <th>Unidad</th>
              <th>Ancho</th>
              <th>Alto</th>
              <th>Largo</th>
              <th>Total Medida</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Dscto Adicional</th>
              <th>Desperdicio</th>
              <th>Riesgo</th>
              <th>Total Base</th>
              <th>Tasa Iva</th>
              <th>Total Iva</th>
              <th>Forma</th>
              <th>Orden Compra</th>
              <th>Peso</th>
              <th>Total Peso</th>
              <th>Redondea5</th>
              <th>Tipo Iva</th>
              <th>Tipo Patente</th>
              <th>Tasa Patente</th>
              <th>Total Patente</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <React.Fragment key={producto.IdVentaDet}>
                <tr className="product-row">
                  <td>
                    <button
                      className={`expand-btn ${expandedRows.includes(producto.IdVentaDet) ? 'rotate' : ''}`}
                      onClick={() => toggleRow(producto.IdVentaDet)}
                    >
                      ▶
                    </button>
                  </td>
                  <td>{producto.Item}</td>
                  <td>{producto.CodProducto}</td>
                  <td>{producto.NomProducto}</td>
                  <td>{"NH Corte"}</td>
                  <td>{producto.NomSubProducto}</td>
                  <td>{producto.CodListaPrecios}</td>
                  <td>{producto.Cantidad}</td>
                  <td>{producto.Pendiente}</td>
                  <td>{producto.PendProducir}</td>
                  <td>{"NH Disponible"}</td>
                  <td>{producto.NomUnidadMedida}</td>
                  <td>{producto.Ancho}</td>
                  <td>{producto.Alto}</td>
                  <td>{producto.Largo}</td>
                  <td>{"Total Medida"}</td>
                  <td>{producto.Precio}</td>
                  <td>{producto.Descuento}</td>
                  <td>{producto.DescuentoA}</td>
                  <td>{producto.Desperdicio}</td>
                  <td>{"Riesgo"}</td>
                  {/* <td>{producto.TotalBase}</td> */}
                  <td>{Number(producto.TotalBase).toFixed(2)}</td>
                  <td>{producto.TasaIva}</td>
                  <td>{Number(producto.TotalIva).toFixed(2)}</td>
                  {/* <td>{producto.TotalIva}</td> */}
                  <td>{"Forma"}</td>
                  <td>{producto.OrdenCompra}</td>
                  <td>{"Peso"}</td>
                  <td>{"Total Peso"}</td>
                  {/* <td>{producto.Redondea5}</td> */}
                  {/* <td>{producto.Redondea5 ? '✔️' : '❌'}</td> */}
                  <td>
                  <input type="checkbox" checked={producto.Redondea5} disabled />
                </td>

                  <td>{"Tipo IVA"}</td>
                  <td>{producto.CodTipoPatente}</td>
                  <td>{producto.TasaPatente}</td>
                  <td>{"Total patente"}</td>
                </tr>
                {expandedRows.includes(producto.IdVentaDet) && (
                  <tr className="details-row">
                    <td colSpan="33">
                      Detalles extra del producto...
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TblProductosFac;






