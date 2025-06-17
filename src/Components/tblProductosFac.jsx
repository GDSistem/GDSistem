import React, { useState } from 'react';
import '../Styles/tblProductosFac.css';
import ResumenCalculosProducto from './ResumenCalculosProducto';

function TblProductosFac({ productos, subdetalles, tasa }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [columnas, setColumnas] = useState([
  { key: "Item", label: "Item", visible: true },
  { key: "CodProducto", label: "Código", visible: true },
  { key: "NomProducto", label: "Producto", visible: true },
  { key: "CodSubProducto", label: "Corte", visible: true },
  { key: "NomSubProducto", label: "Subproducto", visible: true },
  { key: "CodListaPrecios", label: "Lista", visible: true },
  { key: "Cantidad", label: "Cantidad", visible: true },
  { key: "Pendiente", label: "Pendiente", visible: true },
  { key: "PendProducir", label: "Pend. Producir", visible: true },
  { key: "CantidadDisponible", label: "Disponible", visible: true },
  { key: "CodUnidadMedida", label: "Unidad", visible: true },
  { key: "Alto", label: "Alto", visible: true },
  { key: "Ancho", label: "Ancho", visible: true },
  { key: "Largo", label: "Largo", visible: true },
  { key: "TotalMedida", label: "Total Medida", visible: true },
  { key: "Precio", label: "Precio", visible: true },
  { key: "Descuento", label: "Descuento", visible: true },
  { key: "DescuentoA", label: "Descuento Adicional", visible: true },
  { key: "Desperdicio", label: "Desperdicio", visible: true },
  { key: "Riesgo", label: "Riesgo", visible: true },
  { key: "TotalBase", label: "Total Base", visible: true },
  { key: "TasaIva", label: "Tasa IVA", visible: true },
  { key: "TotalIva", label: "Total IVA", visible: true },
  { key: "NomForma", label: "Forma", visible: true },
  { key: "OrdenCompra", label: "Orden Compra", visible: true },
  { key: "Peso", label: "Orden Peso", visible: true },
  { key: "TotalPeso", label: "Total Peso", visible: true },
  { key: "Redondea5", label: "Redondea5", visible: true },
  { key: "NomTipoPatente", label: "Tipo Patente", visible: true },
  { key: "TotalPatente", label: "Total Patente", visible: true },

]);

const [productoSeleccionado, setProductoSeleccionado] = useState(null);


const hasSubdetalles = (idVentaDet) => {
  return subdetalles.some(sub => sub.IdVentaDet === idVentaDet);
};


  console.log("Productos recibidos:", productos);

  const toggleRow = (id) => {
    if (!hasSubdetalles(id)) return;
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };


  return (
    <div className='ContenedorGrand'>
      <div className="Producto-titulo">
        <h3 className="Title">Información de los Productos</h3>
      </div>
      <div className="column-toggles">
        {columnas.map((col, idx) => (
          <label key={col.key} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={col.visible}
              onChange={() =>
                setColumnas((prev) =>
                  prev.map((c, i) =>
                    i === idx ? { ...c, visible: !c.visible } : c
                  )
                )
              }
            />
            {col.label}
          </label>
        ))}
        </div>

      <div className="table-container">
        <div className="table-outer-container">
        <div className="table-inner-scroll">
        <table className="product-table">
          <thead>
          <tr>
          <th></th>
          {columnas
            .filter(col => col.visible)
            .map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
        </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
            <React.Fragment key={producto.IdVentaDet}>
              {/* <tr onClick={() => setProductoSeleccionado(producto)}> */}
              <tr
                onClick={() => setProductoSeleccionado(producto)}
                className={productoSeleccionado?.IdVentaDet === producto.IdVentaDet ? 'selected-rowProduct' : ''}
              >

                <td>
                  {hasSubdetalles(producto.IdVentaDet) && (
                    <button
                      className={`expand-btn ${expandedRows.includes(producto.IdVentaDet) ? 'rotate' : ''}`}
                      onClick={() => toggleRow(producto.IdVentaDet)}
                    >
                      ▶
                    </button>
                  )}
                  {/* <button
                    className={`expand-btn ${expandedRows.includes(producto.IdVentaDet) ? 'rotate' : ''}`}
                    onClick={() => toggleRow(producto.IdVentaDet)}
                  >
                    ▶
                  </button> */}
                </td>
                {columnas
                  .filter(col => col.visible)
                  .map(col => (
                    <td key={col.key}>
                        {col.key === "TotalBase" || col.key === "TotalIva" ? (
                        Number(producto[col.key] || 0).toFixed(2)
                      ) : col.key === "Redondea5" ? (
                        <input type="checkbox" checked={producto[col.key]} disabled />
                      ) : (
                        producto[col.key]
                        )}

                    </td>
                  ))}
              </tr>
            {expandedRows.includes(producto.IdVentaDet) && (
              <tr className="details-row">
                <td colSpan={columnas.filter(c => c.visible).length + 1}>
                  {/* <strong>Subdetalles del producto:</strong> */}
                  {subdetalles.filter(sub => sub.IdVentaDet === producto.IdVentaDet).length > 0 ? (
                    <table className="subdetalle-table">
                      <thead>
                        <tr>
                          
                          <th>Item</th>
                          <th>Codigo</th>
                          <th>Producto</th>
                          <th>Cod Subproducto</th>
                          <th>Subproducto</th>
                          <th>Lista</th>
                          <th>Cantidad</th>
                          <th>CantidadDisponible</th>
                          <th>Unidad M</th>
                          <th>LAncho</th>
                          <th>Ancho</th>
                          <th>LAlto</th>
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
                        {subdetalles
                          .filter(sub => sub.IdVentaDet === producto.IdVentaDet)
                          .map((sub, idx) => (
                            <tr key={idx}>
                              
                              <td>{sub.Item}</td>
                              <td>{sub.CodProducto}</td>
                              <td>{sub.NomProducto}</td>
                              <td>{sub.CodSubProducto}</td>
                              <td>{sub.NomSubProducto}</td>
                              <td>{sub.CodListaPrecios}</td>
                              <td>{sub.CantidadFisica}</td>
                              <td>{Number(sub.CantidadDisponible).toFixed(2)}</td>  
                              <td>{sub.CodUnidadMedida}</td>  
                              <td>{sub.LAncho}</td>
                              <td>{sub.Ancho}</td>
                              <td>{sub.LAlto}</td>
                              <td>{sub.Alto}</td>
                              <td>{sub.Largo}</td>  
                              <td>{sub.TotalMedida}</td>
                              <td>{"Precio calculado"}</td>  
                              <td>{sub.Descuento}</td>
                              <td>{sub.DescuentoA}</td>  
                              <td>{sub.Desperdicio}</td>  
                              <td>{"Riesgo"}</td>
                              <td>{Number(sub.TotalBase).toFixed(2)}</td> 
                              <td>{Number(sub.TasaIva).toFixed(2)}</td> 
                              <td>{Number(sub.TotalIva).toFixed(2)}</td>
                              <td>{sub.CodForma}</td>
                              <td>{sub.OrdenCompra}</td>
                              <td>{sub.Peso}</td>
                              <td>{sub.TotalPeso}</td>
                               <td>
                              <input type="checkbox" checked={sub.Redondea5} disabled />
                              </td>
                              <td>{sub.CodTipoIva}</td>
                              <td>{sub.CodTipoPatente}</td>
                              <td>{sub.TasaPatente}</td>
                              <td>{sub.TotalPatente ? sub.TotalPatente.substring(0, 3) + '...' : ''}</td>

                              {/* <td>{sub.TotalPatente}</td> */}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No hay subdetalles para este producto.</p>
                  )}
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
      <ResumenCalculosProducto
  productoSeleccionado={productoSeleccionado}
  todosProductos={productos}
  subdetalles={subdetalles}
  tasa={tasa}
/>

    </div>
  );
}

export default TblProductosFac;






