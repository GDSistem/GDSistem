import React from 'react'

function FiltrosBusquedaListadoFact({ filtros, setFiltros }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
      };

  return (
    <div className="contenedor-filtros">
      <input name="nombreSucursal" value={filtros.nombreSucursal} onChange={handleChange} placeholder="Nombre de Sucursal" />
      <input name="nombreCliente" value={filtros.nombreCliente} onChange={handleChange} placeholder="Nombre del Cliente" />
      <input name="tipoDocumento" value={filtros.tipoDocumento} onChange={handleChange} placeholder="Tipo de Documento" />
      <input name="numeroDocumento" value={filtros.numeroDocumento} onChange={handleChange} placeholder="# Documento" />
      <input type="date" name="fechaDesde" value={filtros.fechaDesde} onChange={handleChange} />
      <input type="date" name="fechaHasta" value={filtros.fechaHasta} onChange={handleChange} />
    </div>
  )
}

export default FiltrosBusquedaListadoFact