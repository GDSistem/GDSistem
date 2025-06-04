import React, { useState } from 'react';
import '../Styles/tblProductosFac.css';

function TblProductosFac({ productos}) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [columnas, setColumnas] = useState([
  { key: "Item", label: "Item", visible: true },
  { key: "CodProducto", label: "Código", visible: true },
  { key: "NomProducto", label: "Producto", visible: true },
  { key: "Corte", label: "Corte", visible: true },
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

  //  <th>Item</th>
  //             <th>Codigo</th>
  //             <th>Producto</th>
  //             <th>Corte</th>
  //             <th>Subproducto</th>
  //             <th>Lista</th>
  //             <th>Cantidad</th>
  //             <th>Pendiente</th>
  //             <th>Prend. Producir</th>
  //             <th>Disponible</th>
  //             <th>Unidad</th>
  //             <th>Ancho</th>
  //             <th>Alto</th>
  //             <th>Largo</th>
  //             <th>Total Medida</th>
  //             <th>Precio</th>
  //             <th>Descuento</th>
  //             <th>Dscto Adicional</th>
  //             <th>Desperdicio</th>
  //             <th>Riesgo</th>
  //             <th>Total Base</th>
  //             <th>Tasa Iva</th>
  //             <th>Total Iva</th>
  //             <th>Forma</th>
  //             <th>Orden Compra</th>
  //             <th>Peso</th>
  //             <th>Total Peso</th>
  //             <th>Redondea5</th>
  //             <th>Tipo Iva</th>
  //             <th>Tipo Patente</th>
  //             <th>Tasa Patente</th>
  //             <th>Total Patente</th>
  // ... agrega las demás columnas que necesites
]);

  console.log("Productos recibidos:", productos);

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
            {/* <tr>
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
            </tr> */}
          </thead>
          <tbody>
            {productos.map(producto => (
            <React.Fragment key={producto.IdVentaDet}>
              <tr>
                <td>
                  <button
                    className={`expand-btn ${expandedRows.includes(producto.IdVentaDet) ? 'rotate' : ''}`}
                    onClick={() => toggleRow(producto.IdVentaDet)}
                  >
                    ▶
                  </button>
                </td>
                {columnas
                  .filter(col => col.visible)
                  .map(col => (
                    <td key={col.key}>
                      {/* {col.key === "TotalBase" || col.key === "TotalIva"
                        ? Number(producto[col.key] || 0).toFixed(2)
                        : producto[col.key]} */}
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
                    Detalles extra del producto...
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
            {/* {productos.map((producto) => (
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
                  <td>{Number(producto.TotalBase).toFixed(2)}</td>
                  <td>{producto.TasaIva}</td>
                  <td>{Number(producto.TotalIva).toFixed(2)}</td>
            
                  <td>{"Forma"}</td>
                  <td>{producto.OrdenCompra}</td>
                  <td>{"Peso"}</td>
                  <td>{"Total Peso"}</td>
                 
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
            ))} */}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TblProductosFac;






