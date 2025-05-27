
import React, { useState } from 'react';

import '../Styles/tblProductosFac.css'

function tblProductosFac({ productos }) {
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
  </table>

  <div className="table-body-container">
    <table className="product-table">
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
              <td>{producto.NomProducto}</td>
              <td>{producto.Cantidad}</td>
              <td>{producto.Precio != null ? producto.Precio.toFixed(2) : '0.00'}</td>
              <td>{producto.Alto}</td>
              <td>{producto.Ancho}</td>
              <td>{producto.Largo}</td>
              <td>{producto.TasaIva}</td>
              <td>{producto.TotalBase != null ? producto.TotalBase.toFixed(2) : '0.00'}</td>
              <td>{producto.TotalIva != null ? producto.TotalIva.toFixed(2) : '0.00'}</td>
              <td>{producto.DescuentoA}</td>
              <td>{producto.NomSubProducto}</td>
              <td>{producto.NomSubProducto}</td>
              <td>{producto.NomSubProducto}</td>
              <td>{producto.NomSubProducto}</td>
              <td>{producto.NomSubProducto}</td>
              <td>{producto.NomSubProducto}</td>
            </tr>
            {expandedRows.includes(producto.IdVentaDet) && (
              <tr className="details-row">
                <td colSpan="32">
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

);
   
  
}

export default tblProductosFac;


