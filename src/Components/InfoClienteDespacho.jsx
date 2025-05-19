import React, { useEffect, useState } from 'react';

import "../Styles//InfoClienteDespacho.css"

function InfoClienteDespacho({ item }) {
  const [clienteInfo, setClienteInfo] = useState(null);
  const [despachoInfo, setDespachoInfo] = useState(null);

useEffect(() => {
    if (!item) return;
  
    const cliente = item.clienteData;
  
    setClienteInfo({
      codigo: cliente?.CodCliente || item.codigoCliente,
      nombre: cliente?.NomCliente || item.cliente,
      direccion: cliente?.Direccion || "No disponible",
      telefono: cliente?.Telefono1 || "No disponible",
      grupo: item.grupocod || "",
      fechadoc: item.fechadoc || ""
    });
  
    setDespachoInfo({
      numeroDespacho: "D-" + item.numeroDocumento,
      fechaDespacho: item.fecha,
      status: "Entregado"
    });
  }, [item]);
  

  if (!item) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      {/* <div className="cliente-info">
      <h3>Información del Cliente</h3>
        <div>
            <h3>Columna izquierda</h3>
            <p><strong>Código:</strong> {clienteInfo?.codigo}</p>
            <p><strong>Nombre:</strong> {clienteInfo?.nombre}</p>
            <p><strong>Dirección:</strong> {clienteInfo?.direccion}</p>
            <p><strong>Teléfono:</strong> {clienteInfo?.telefono}</p>

        </div>

        <div>
            <h3>Columna derecha</h3>
            <p><strong>Código:</strong> {clienteInfo?.codigo}</p>
            <p><strong>Nombre:</strong> {clienteInfo?.nombre}</p>
            <p><strong>Dirección:</strong> {clienteInfo?.direccion}</p>
            <p><strong>Teléfono:</strong> {clienteInfo?.telefono}</p>

        </div>
        
        
      </div> */}

<div className="cliente-info">
  <h3>Información del Cliente</h3>
  <div className="columna-izquierda">
    <p><strong>Código:</strong> {clienteInfo?.codigo}</p>
    <p><strong>Nombre:</strong> {clienteInfo?.nombre}</p>
    <p><strong>RIF:</strong> {item.clienteData?.Rif}</p>
    <p><strong>Dirección:</strong> {clienteInfo?.direccion}</p>
    <p><strong>Ciudad:</strong> {item.clienteData?.Ciudad}</p>
    <p><strong>Estado:</strong> {item.clienteData?.Estado}</p>
    <p><strong>Teléfono 1:</strong> {item.clienteData?.Telefono1}</p>
    <p><strong>Teléfono 2:</strong> {item.clienteData?.Telefono2}</p>
    <p><strong>Email:</strong> {item.clienteData?.Email}</p>
  </div>

  <div className="columna-derecha">
    <p><strong>Actividad:</strong> {item.clienteData?.Actividad}</p>
    <p><strong>Días Crédito:</strong> {item.clienteData?.DiasCredito}</p>
    <p><strong>Monto Crédito:</strong> {item.clienteData?.MontoCredito}</p>
    <p><strong>Observaciones:</strong> {item.clienteData?.Observaciones}</p>
    <p><strong>Lista de Precios:</strong> {item.clienteData?.IdListaPrecios}</p>
    <p><strong>Vendedor:</strong> {item.clienteData?.NomVendedor}</p>
    <p><strong>Cod Vendedor:</strong> {item.clienteData?.CodVendedor}</p>
  </div>
</div>

      <div className="despacho-info" style={{ marginTop: "20px" }}>
        <h3>Información del Despacho</h3>
        <p><strong>Número:</strong> {despachoInfo?.numeroDespacho}</p>
        <p><strong>Fecha:</strong> {despachoInfo?.fechaDespacho}</p>
        <p><strong>Estado:</strong> {despachoInfo?.status}</p>
      </div>
    </div>
  );
}

export default InfoClienteDespacho;
