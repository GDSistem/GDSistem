// import React from 'react'
// import "../Styles/FiltrosBusquedaListadoFact.css"

// function FiltrosBusquedaListadoFact({ filtros, setFiltros }) {

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFiltros((prev) => ({ ...prev, [name]: value }));
//       };

//   return (
//     <div className="contenedor-filtros">
//       {/* <input name="nombreSucursal" value={filtros.nombreSucursal} onChange={handleChange} placeholder="Nombre de Sucursal" /> */}
//       <input name="nombreCliente" value={filtros.nombreCliente} onChange={handleChange} placeholder="Nombre del Cliente" />
     
//         {/* <label>Tipo Documento:</label> */}
//         <select
//           name="tipoDocumento"
//         //   className="desplegable"
//           value={filtros.tipoDocumento}
//           onChange={handleChange}
//         >
//           <option value="">Tipo Documento</option>
//           <option value="F">F</option>
//           <option value="P">P</option>
//           <option value="NC">NC</option>
//           <option value="ND">ND</option>
//           <option value="OI">OI</option>
//         </select>

//       <input name="numeroDocumento" value={filtros.numeroDocumento} onChange={handleChange} placeholder="# Documento" />
//       <input type="date" name="fechaDesde" value={filtros.fechaDesde} onChange={handleChange} />
//       <input type="date" name="fechaHasta" value={filtros.fechaHasta} onChange={handleChange} />
//     </div>
//   )
// }

// export default FiltrosBusquedaListadoFact

import React from 'react';
import "../Styles/FiltrosBusquedaListadoFact.css";

function FiltrosBusquedaListadoFact({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contenedor-filtros">
      <input name="nombreCliente" value={filtros.nombreCliente} onChange={handleChange} placeholder="Nombre del Cliente" />

      <select
        name="tipoDocumento"
        value={filtros.tipoDocumento}
        onChange={handleChange}
        className="select-filtro"
      >
        <option value="">Tipo Documento</option>
        <option value="F">F</option>
        <option value="P">P</option>
        <option value="NC">NC</option>
        <option value="ND">ND</option>
        <option value="OI">OI</option>
      </select>

      <input name="numeroDocumento" value={filtros.numeroDocumento} onChange={handleChange} placeholder="# Documento" />
      <input type="date" name="fechaDesde" value={filtros.fechaDesde} onChange={handleChange} />
      <input type="date" name="fechaHasta" value={filtros.fechaHasta} onChange={handleChange} />
    </div>
  );
}

export default FiltrosBusquedaListadoFact;
