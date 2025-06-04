import React, { useState } from 'react';
import "../Styles/TablaListadoFacturacion.css";

function TablaListadoFacturacion({ datos, onRowSelect, selectedIndex, setSelectedIndex}) {
    console.log("Datos recibidos", datos);

    // const [selectedIndex, setSelectedIndex] = useState(null);

    const handleRowClick = (item, index) => {
    setSelectedIndex(index);
    onRowSelect(item);
  };

  const columnas = [
  { key: "tipoDocumento", label: "Tipo Doc", visible: true },
  { key: "codigoSucursal", label: "Sucursal", visible: true },
  { key: "fecha", label: "Fecha", visible: true },
  { key: "hora", label: "Hora", visible: true },
  { key: "numeroDocumento", label: "# Documento", visible: true },
  { key: "codigoCliente", label: "Cód Cliente", visible: true },
  { key: "cliente", label: "Cliente", visible: true },
  { key: "tasa", label: "Tasa", visible: true },
  { key: "monto", label: "Monto", visible: true },
  { key: "montoIVA", label: "IVA", visible: true },
  { key: "igtf", label: "IGTF", visible: true },
  { key: "total", label: "Total", visible: true },
  { key: "nula", label: "Nula", visible: true }
];

const [columnConfig, setColumnConfig] = useState(columnas);

const toggleColumn = (key) => {
  setColumnConfig((prev) =>
    prev.map((col) =>
      col.key === key ? { ...col, visible: !col.visible } : col
    )
  );
};

const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
const handleSort = (key) => {
  setSortConfig((prev) => ({
    key,
    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
  }));
};

const sortedDatos = [...datos].sort((a, b) => {
  if (!sortConfig.key) return 0;
  const valA = a[sortConfig.key]?.toString().toLowerCase() ?? "";
  const valB = b[sortConfig.key]?.toString().toLowerCase() ?? "";
  if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
  if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
  return 0;
});





  return (

    
   <div className='Container-listado'>
    <div className="column-controls">
    {columnConfig.map((col) => (
      <label key={col.key} style={{ marginRight: "10px" }}>
        <input
          type="checkbox"
          checked={col.visible}
          onChange={() => toggleColumn(col.key)}
        />
        {col.label}
      </label>
    ))}
  </div>
    <div className="factura-table-container">
        
  <table className="factura-table">
    <thead>
      <tr>
        {columnConfig.filter(c => c.visible).map((col) => (
      // <th key={col.key}>{col.label}</th>
      <th key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: 'pointer' }}>
        {col.label} {sortConfig.key === col.key && (
    <span className="sort-arrow">
      {sortConfig.direction === 'asc' ? '▲' : '▼'}
    </span>
  )}
         {/* {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''} */}
      </th>
    ))}
        {/* <th>Tipo Doc</th>
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
        <th>Nula</th> */}
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
            sortedDatos.map((item, index) => (
            // <tr key={index} onClick={() => handleRowClick(item, index)}  className={`clickable-row ${selectedIndex === index ? 'selected-row' : ''}`}>
            <tr
            key={index}
            onClick={() => handleRowClick(item, index)}
            className={`clickable-row ${selectedIndex === index ? 'selected-row' : ''} ${item.nula ? 'nula-row' : ''}`}
          >

            {columnConfig.filter(c => c.visible).map((col) => (
          <td key={col.key}>
            {col.key === "numeroDocumento" ? item[col.key].replace(/\D/g, '') :
             col.key === "nula" ? (item[col.key] ? "Sí" : "No") :
             item[col.key] !== undefined && item[col.key] !== null ? item[col.key] : ""
             }
          </td>
        ))}

              {/* <td>{item.tipoDocumento.toUpperCase()}</td>
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
              <td>{item.nula ? 'Sí' : 'No'}</td> */}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
</div>

  );
}

export default TablaListadoFacturacion;

