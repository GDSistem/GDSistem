import React, { useEffect, useState } from 'react';

import "../Styles//InfoClienteDespacho.css"

function InfoClienteDespacho({ item }) {
  const [clienteInfo, setClienteInfo] = useState(null);
  const [despachoInfo, setDespachoInfo] = useState(null);

  useEffect(() => {
    if (!item) return;

    // Simulación, más adelante puedes usar fetch a tus endpoints
    setClienteInfo({
      codigo: item.codigoCliente,
      nombre: item.cliente,
      direccion: "Calle Falsa 123",
      telefono: "0412-1234567",
      cliente: item.cliente,
      grupo: item.grupocod,
      grupo: item.grupnom,
      fechadoc: item.fechadoc,


    }, );

    setDespachoInfo({
      numeroDespacho: "D-" + item.numeroDocumento,
      fechaDespacho: item.fecha,
      status: "Entregado"
    });
  }, [item]);

  if (!item) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="cliente-info">
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
