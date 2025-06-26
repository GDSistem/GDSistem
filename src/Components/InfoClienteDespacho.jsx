
// import React, { useEffect, useState } from 'react';

// import "../Styles//InfoClienteDespacho.css"

// function InfoClienteDespacho({ item, modoEdicion, onChangeCliente  }) {

//     if (!item) return <div>Seleccione una factura para ver detalles del cliente</div>;

//     const { clienteData} = item;
//     const cliente = Array.isArray(clienteData) ? clienteData[0] : clienteData;
//       const [mostrarMas, setMostrarMas] = useState(false);


//     console.log("Renderizando InfoClienteDespacho con item:", item);
//     console.log("clienteData:", clienteData);

//     function formatearFecha(fechaStr) {
//         if (!fechaStr) return ""; // Maneja null, undefined o vacío
//         const fecha = new Date(fechaStr);
//         if (isNaN(fecha)) return ""; // Fecha inválida
//         const dia = String(fecha.getDate()).padStart(2, '0');
//         const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Enero es 0
//         const año = fecha.getFullYear();
//         return `${dia}/${mes}/${año}`;
//       }

//        const handleInputChange = (campo, valor) => {
//     if (onChangeCliente) {
//       onChangeCliente({ ...cliente, [campo]: valor });
//     }
//   };
      

//   return (

//     <div className="tarjeta-cliente">
//       <h2>Información del Cliente</h2>
      
//       <div className="info-resumen">
       
//         <div className="info-bloque">
//           <p><strong>Cliente:</strong> {cliente?.CodCliente}</p>
          
//           <p><strong></strong> {cliente?.NomCliente}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>RIF:</strong> {cliente?.Rif}</p>
//           <p><strong>NIT:</strong> {cliente?.Nit}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Tipo Personas:</strong> {cliente?.CodTipoPersona}</p>
//           <p><strong></strong> {cliente?.NomTipoPersona}</p>
//         </div>
        
//       </div>

//       {mostrarMas && (
//         <div className="info-extra">
//           <div className="info-bloque">
//           <p><strong>Grupo:</strong> {cliente?.CodGrupoCliente}</p>
//           <p><strong></strong> {cliente?.NomGrupoCliente}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Fecha Documento:</strong> {formatearFecha(cliente?.FechaDoc)}</p>
//           <p><strong>Fecha Contabilizada:</strong> {formatearFecha(cliente?.FechaContabilizada)}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Vendedor Interno:</strong> {cliente?.IdVendedorInt}</p>
//           <p><strong>Nombre:</strong> {cliente?.NomVendedorInt}</p>
          
          
//         </div>
//         <div className="info-bloque">
//           <p><strong>Vendedor Externo:</strong> {cliente?.IdVendedorExt}</p>
//           <p><strong>Nombre:</strong> {cliente?.NomVendedorExt}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Días Crédito:</strong> {cliente?.DiasCredito}</p>
//           <p><strong>Fecha Vencimiento:</strong> {formatearFecha(cliente?.Fecha)}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Días Adicionales:</strong> {cliente?.DiasAdicionales}</p>
//           <p><strong>% contado:</strong> {cliente?.PorcentajeContado}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Monto Crédito:</strong> {cliente?.MontoCredito}</p>
//           <p><strong>Crédito Grupo:</strong> {cliente?.PaisD}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Plazo Entrega:</strong> {cliente?.PaisD}</p>
//           <p><strong>Fecha Compromiso:</strong> {cliente?.FechaPromesa}</p>
//         </div>
//         <div className="info-bloque">
//           <label>
//             <strong>Exportación:</strong>
//             <input
//             type="checkbox"
//             checked={cliente?.Exportacion === true}
//             readOnly
//             style={{ marginLeft: '10px' }}
//             />
//         </label>
//           <p><strong>Retención IVA:</strong> {cliente?.RetencionIva}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Dirección:</strong> {cliente?.Direccion}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Ciudad:</strong> {cliente?.Ciudad}</p>
//         </div>
//         <div className="info-bloque">
          
//           <p><strong>Estado:</strong> {cliente?.Estado}</p>
//            <p><strong>País:</strong> {cliente?.Pais}</p>
          
//         </div>
      
//         <div className="info-bloque">
//           <p><strong>Teléfono 1:</strong> {cliente?.Telefono1}</p>
//           <p><strong>Teléfono 2:</strong> {cliente?.Telefono2}</p>

//         </div>
    
//         <div className="info-bloque">
//           <p><strong>E-mail:</strong> {cliente?.Email}</p>
//           <p><strong>Fax:</strong> {cliente?.Fax}</p>
         
//         </div>
      
//         <div className="info-bloque">
//           <p><strong>Observaciones:</strong> {cliente?.Observaciones}</p>
//         </div>
//         <div className="cliente-ultimo">
//     <div className="columna">

//         <div className="info-bloque">
//           <p><strong>Fecha:</strong> {formatearFecha(cliente?.Fecha)}</p>
//           <p><strong>Fecha Nula:</strong> {formatearFecha(cliente?.FechaNula)}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Equipo:</strong> {cliente?.Equipo}</p>
//           <p><strong>Equipo Nula:</strong> {cliente?.EquipoNula}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Usuario:</strong> {cliente?.Usuario}</p>
//           <p><strong>usuario Nula:</strong> {cliente?.UsuarioNula}</p>
//         </div>
//         <div className="info-bloque">
//           <p><strong>Comentario Nula:</strong> {cliente?.Actividad}</p>
       
//         </div>
//         </div>
        
     
//     </div>

     
     
//         </div>
//       )}

//       <button className="btn-leer" onClick={() => setMostrarMas(!mostrarMas)}>
//         {mostrarMas ? "Leer menos" : "Leer más"}
//       </button>
//     </div>
//   );
// }

// export default InfoClienteDespacho;


import React, { useEffect, useState } from 'react';
import "../Styles//InfoClienteDespacho.css";

function InfoClienteDespacho({ item, modoEdicion, onChangeCliente }) {
  if (!item) return <div>Seleccione una factura para ver detalles del cliente</div>;

  const { clienteData } = item;
  const cliente = Array.isArray(clienteData) ? clienteData[0] : clienteData;
  const [mostrarMas, setMostrarMas] = useState(false);

  function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    if (isNaN(fecha)) return "";
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

  const handleInputChange = (campo, valor) => {
    if (onChangeCliente) {
      onChangeCliente({ ...cliente, [campo]: valor });
    }
  };

  return (
    <div className="tarjeta-cliente">
      <h2>Información del Cliente</h2>

      <div className="info-resumen">
        <div className="info-bloque">
          <p><strong>Cliente:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.CodCliente || ''} 
                onChange={(e) => handleInputChange("CodCliente", e.target.value)} 
              />
            ) : (
              cliente?.CodCliente
            )}
          </p>

          <p><strong>Nombre:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.NomCliente || ''} 
                onChange={(e) => handleInputChange("NomCliente", e.target.value)} 
              />
            ) : (
              cliente?.NomCliente
            )}
          </p>
        </div>

        <div className="info-bloque">
          <p><strong>RIF:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.Rif || ''} 
                onChange={(e) => handleInputChange("Rif", e.target.value)} 
              />
            ) : (
              cliente?.Rif
            )}
          </p>
          <p><strong>NIT:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.Nit || ''} 
                onChange={(e) => handleInputChange("Nit", e.target.value)} 
              />
            ) : (
              cliente?.Nit
            )}
          </p>
        </div>

        <div className="info-bloque">
          <p><strong>Tipo Persona:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.CodTipoPersona || ''} 
                onChange={(e) => handleInputChange("CodTipoPersona", e.target.value)} 
              />
            ) : (
              cliente?.CodTipoPersona
            )}
          </p>
          <p><strong>Nombre:</strong> 
            {modoEdicion ? (
              <input 
                value={cliente?.NomTipoPersona || ''} 
                onChange={(e) => handleInputChange("NomTipoPersona", e.target.value)} 
              />
            ) : (
              cliente?.NomTipoPersona
            )}
          </p>
        </div>
      </div>

      {/* Puedes seguir con este patrón para los campos en mostrarMas */}

      <button className="btn-leer" onClick={() => setMostrarMas(!mostrarMas)}>
        {mostrarMas ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}

export default InfoClienteDespacho;

