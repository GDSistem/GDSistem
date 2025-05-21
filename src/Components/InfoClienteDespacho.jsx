// import React, { useEffect, useState } from 'react';

// import "../Styles//InfoClienteDespacho.css"

// function InfoClienteDespacho({ item }) {
//   const [clienteInfo, setClienteInfo] = useState(null);
//   const [despachoInfo, setDespachoInfo] = useState(null);



// useEffect(() => {
//     if (!item) return;
  
//     const cliente = item.clienteData;
  
//     setClienteInfo({
//       codigo: cliente?.CodCliente || item.codigoCliente,
//       nombre: cliente?.NomCliente || item.cliente,
//       direccion: cliente?.Direccion || "No disponible",
//       telefono: cliente?.Telefono1 || "No disponible",
//       grupo: item.grupocod || "",
//       fechadoc: item.fechadoc || ""
//     });

  
  
//     setDespachoInfo({
//       numeroDespacho: "D-" + item.numeroDocumento,
//       fechaDespacho: item.fecha,
//       status: "Entregado"
//     });
//   }, [item]);


  

//   if (!item) return null;

//   return (
// <div className="ContenedorGrande">
//   <div className="clien-big">
//     <div className="cliente-titulo">
//       <h3 className="Title">Información del Cliente</h3>
//     </div>

//     <div className="cliente-info">
//       <div className="columna">
//         <div className="info-bloque">
//           <p><strong>Cliente:</strong> {clienteInfo?.codigo}</p>
//           <p><strong></strong> {clienteInfo?.nombre}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Grupo:</strong> {item.clienteData?.IdGrupoCliente}</p>
//           <p><strong></strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Fecha Documento:</strong> {item.clienteData?.Pais}</p>
//           <p><strong>Fecha Contabilizada:</strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Tipo Personas:</strong> {item.clienteData?.IdTipoPersona}</p>
//           <p><strong></strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Lista Precios:</strong> {item.clienteData?.IdListaPrecios}</p>
//           <p><strong></strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Vendedor Interno:</strong> {item.clienteData?.IdVendedorInt}</p>
//           <p><strong>Nombre:</strong> {item.clienteData?.NomVendedor}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Vendedor Externo:</strong> {item.clienteData?.IdVendedorExt}</p>
//           <p><strong>Nombre:</strong> {item.clienteData?.NomVendedor}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Días Crédito:</strong> {item.clienteData?.DiasCredito}</p>
//           <p><strong>Fecha Vencimiento:</strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Días Adicionales:</strong> {item.clienteData?.DiasAdicionales}</p>
//           <p><strong>% contado:</strong> {item.clienteData?.PorcentajeContado}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Monto Crédito:</strong> {item.clienteData?.MontoCredito}</p>
//           <p><strong>Crédito Grupo:</strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Pazo Entrega:</strong> {item.clienteData?.Pais}</p>
//           <p><strong>Fecha Compromiso:</strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <label>
//             <strong>Exportación:</strong>
//             <input
//             type="checkbox"
//             checked={item.clienteData?.Exportacion === true}
//             readOnly
//             style={{ marginLeft: '10px' }}
//             />
//         </label>
//           <p><strong>Retención IVA:</strong> {item.clienteData?.RetencionIva}</p>
//         </div>
//       </div>

//       <div className="columna">
//         <div className="info-bloque">
//           <p><strong>RIF:</strong> {item.clienteData?.Rif}</p>
//           <p><strong>NIT:</strong> {item.clienteData?.Nit}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Dirección:</strong> {clienteInfo?.direccion}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Ciudad:</strong> {item.clienteData?.Ciudad}</p>
//         </div>
//         <div className="info-bloque">
          
//           <p><strong>Estado:</strong> {item.clienteData?.Estado}</p>
          
//         </div>
//         <div className="info-bloque">
          
//           <p><strong>País:</strong> {item.clienteData?.Pais}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Teléfono 1:</strong> {item.clienteData?.Telefono1}</p>

//         </div>
//         <div className="info-bloque">
 
//           <p><strong>Teléfono 2:</strong> {item.clienteData?.Telefono2}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Fax:</strong> {item.clienteData?.Fax}</p>
         
//         </div>
//         <div className="info-bloque">

//           <p><strong>E-mail:</strong> {item.clienteData?.Email}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Observaciones:</strong> {item.clienteData?.Observaciones}</p>
//         </div>
//       </div>
//     </div>

//     <div className="cliente-ultimo">
//     <div className="columna">

//         <div className="info-bloque2">
//           <p><strong>Fecha:</strong> {item.clienteData?.Fax}</p>
//           <p><strong>Fecha Nula:</strong> {item.clienteData?.Email}</p>
//         </div>
//         <div className="info-bloque2">
//           <p><strong>Equipo:</strong> {item.clienteData?.Equipo}</p>
//           <p><strong>Equipo Nula:</strong> {item.clienteData?.Email}</p>
//         </div>
//         <div className="info-bloque2">
//           <p><strong>Usuario:</strong> {item.clienteData?.Usuario}</p>
//           <p><strong>usuario Nula:</strong> {item.clienteData?.Email}</p>
//         </div>
//         </div>
//         <div className="columna">
//           <p><strong>Comentario:</strong> {item.clienteData?.Fax}</p>
       
//         </div>
     
//     </div>
//   </div>
//    <div className="despacho-info" style={{ marginTop: "20px" }}>
//         <h3>Información del Despacho</h3>
//         <p><strong>Número:</strong> {despachoInfo?.numeroDespacho}</p>
//         <p><strong>Fecha:</strong> {despachoInfo?.fechaDespacho}</p>
//         <p><strong>Estado:</strong> {despachoInfo?.status}</p>
//       </div>
// </div>

//   );
// }

// export default InfoClienteDespacho;

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
<div className="ContenedorGrande">
  <div className="clien-big">
    <div className="cliente-titulo">
      <h3 className="Title">Información del Cliente</h3>
    </div>

    <div className="cliente-info">
      <div className="columna">
        <div className="info-bloque">
          <p><strong>Cliente:</strong> {clienteInfo?.codigo}</p>
          <p><strong></strong> {clienteInfo?.nombre}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Grupo:</strong> {item.clienteData?.IdGrupoCliente}</p>
          <p><strong></strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Fecha Documento:</strong> {item.clienteData?.Pais}</p>
          <p><strong>Fecha Contabilizada:</strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Tipo Personas:</strong> {item.clienteData?.IdTipoPersona}</p>
          <p><strong></strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Lista Precios:</strong> {item.clienteData?.IdListaPrecios}</p>
          <p><strong></strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Vendedor Interno:</strong> {item.clienteData?.IdVendedorInt}</p>
          <p><strong>Nombre:</strong> {item.clienteData?.NomVendedor}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Vendedor Externo:</strong> {item.clienteData?.IdVendedorExt}</p>
          <p><strong>Nombre:</strong> {item.clienteData?.NomVendedor}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Días Crédito:</strong> {item.clienteData?.DiasCredito}</p>
          <p><strong>Fecha Vencimiento:</strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Días Adicionales:</strong> {item.clienteData?.DiasAdicionales}</p>
          <p><strong>% contado:</strong> {item.clienteData?.PorcentajeContado}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Monto Crédito:</strong> {item.clienteData?.MontoCredito}</p>
          <p><strong>Crédito Grupo:</strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Pazo Entrega:</strong> {item.clienteData?.Pais}</p>
          <p><strong>Fecha Compromiso:</strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <label>
            <strong>Exportación:</strong>
            <input
            type="checkbox"
            checked={item.clienteData?.Exportacion === true}
            readOnly
            style={{ marginLeft: '10px' }}
            />
        </label>
          <p><strong>Retención IVA:</strong> {item.clienteData?.RetencionIva}</p>
        </div>
      </div>

      <div className="columna">
        <div className="info-bloque">
          <p><strong>RIF:</strong> {item.clienteData?.Rif}</p>
          <p><strong>NIT:</strong> {item.clienteData?.Nit}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Dirección:</strong> {clienteInfo?.direccion}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Ciudad:</strong> {item.clienteData?.Ciudad}</p>
        </div>
        <div className="info-bloque">
          
          <p><strong>Estado:</strong> {item.clienteData?.Estado}</p>
          
        </div>
        <div className="info-bloque">
          
          <p><strong>País:</strong> {item.clienteData?.Pais}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Teléfono 1:</strong> {item.clienteData?.Telefono1}</p>

        </div>
        <div className="info-bloque">
 
          <p><strong>Teléfono 2:</strong> {item.clienteData?.Telefono2}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Fax:</strong> {item.clienteData?.Fax}</p>
         
        </div>
        <div className="info-bloque">

          <p><strong>E-mail:</strong> {item.clienteData?.Email}</p>
        </div>
        <div className="info-bloque">
          <p><strong>Observaciones:</strong> {item.clienteData?.Observaciones}</p>
        </div>
      </div>
    </div>

    <div className="cliente-ultimo">
    <div className="columna">

        <div className="info-bloque2">
          <p><strong>Fecha:</strong> {item.clienteData?.Fax}</p>
          <p><strong>Fecha Nula:</strong> {item.clienteData?.Email}</p>
        </div>
        <div className="info-bloque2">
          <p><strong>Equipo:</strong> {item.clienteData?.Equipo}</p>
          <p><strong>Equipo Nula:</strong> {item.clienteData?.Email}</p>
        </div>
        <div className="info-bloque2">
          <p><strong>Usuario:</strong> {item.clienteData?.Usuario}</p>
          <p><strong>usuario Nula:</strong> {item.clienteData?.Email}</p>
        </div>
        </div>
        <div className="columna">
          <p><strong>Comentario:</strong> {item.clienteData?.Fax}</p>
       
        </div>
     
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
