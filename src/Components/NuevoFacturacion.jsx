// import React, { useEffect, useState } from 'react';

// function NuevoFacturacion({ resultados, numeroDocumento }) {
//   const [facturaEncontrada, setFacturaEncontrada] = useState(null);
//   const [cliente, setCliente] = useState(null);

//   // Buscar factura con el mismo #Documento
//   useEffect(() => {
//     if (!numeroDocumento || !resultados || resultados.length === 0) return;

//     const factura = resultados.find(
//       (item) => item.numeroDocumento === numeroDocumento
//     );

//     if (factura) {
//       setFacturaEncontrada(factura);
//       buscarCliente(factura.codigoCliente);
//     }
//   }, [numeroDocumento, resultados]);

//   const buscarCliente = async (codigoCliente) => {
//     try {
//       const response = await fetch("http://localhost:3000/api/ventas/factura/cliente", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ codCliente: codigoCliente })
//       });

//       if (!response.ok) {
//         throw new Error("Error al consultar información del cliente");
//       }

//       const data = await response.json();
//       if (data.success) {
//         setCliente(data.data);
//       } else {
//         console.error("Cliente no encontrado");
//       }
//     } catch (error) {
//       console.error("Error al obtener cliente:", error);
//     }
//   };

//   return (
//     <div className='nuevo-facturacion'>
//       <h2>Nuevo Registro de Facturación</h2>

//       {facturaEncontrada ? (
//         <div>
          

//           {cliente && (
//             <div>
//               <h3>Datos del Cliente</h3>
//               <p><strong>Nombre:</strong> {cliente.NomCliente}</p>
//               <p><strong>RIF:</strong> {cliente.Rif}</p>
//               <p><strong>Email:</strong> {cliente.Email}</p>
//               {/* Puedes seguir agregando campos del cliente */}
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>No se encontró ninguna factura con ese número de documento.</p>
//       )}
//     </div>
//   );
// }

// export default NuevoFacturacion;

import React, { useEffect, useState } from 'react';
import '../Styles/NuevoFacturacion.css'

function NuevoFacturacion({ resultados, numeroDocumento }) {
  const [facturaEncontrada, setFacturaEncontrada] = useState(null);
  const [formData, setFormData] = useState({});
  const [facturaData, setFacturaData] = useState({});


  useEffect(() => {
    if (!numeroDocumento || !resultados?.length) return;

    const factura = resultados.find(
      (item) => item.numeroDocumento === numeroDocumento
    );

    if (factura) {
      setFacturaEncontrada(factura);
    //   buscarCliente(factura.codigoCliente);
    buscarCliente(factura.codigoCliente, factura); 
    }
  }, [numeroDocumento, resultados]);

  const buscarCliente = async (codigoCliente, facturaOriginal) => {
    try {
      const response = await fetch("http://localhost:3000/api/ventas/factura/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ codCliente: codigoCliente })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFormData({ ...data.data});
        setFacturaData({
        FechaContabilizada: facturaOriginal.FechaContabilizada,
        FechaDoc: facturaOriginal.FechaDoc,
        idVenta: facturaOriginal.idVenta,
        FechaPromesa: facturaOriginal.FechaPromesa,
        Nula: facturaOriginal.Nula,
        FechaNula: facturaOriginal.FechaNula,
        UsuarioNula: facturaOriginal.UsuarioNula,
        EquipoNula: facturaOriginal.EquipoNula,
        ComentarioNula: facturaOriginal.ComentarioNula,
    

        // agrega los que necesites
      });
      } else {
        console.error("Cliente no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener cliente:", error);
    }
    console.log("Factura encontrada:", facturaOriginal);
    console.log("Formdata:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toISOString().split('T')[0];
  };

  

  return (
    <div className='nuevo-facturacion'>
      <h2>Nuevo Registro de Facturación</h2>

      {facturaEncontrada ? (
        <form className="formulario-cliente">
            
  {/* <h3>Datos del Cliente</h3> */}

  <div className="contenedor-izquierdo">
    <div className="bloque-doble">
      <div className="form-group2">
        <label>Código Cliente</label>
        {/* <input type="text" name="CodCliente" value={formData.CodCliente || ''} onChange={handleChange} /> */}
        <input type="text" name="CodCliente" value={formData.CodCliente || ''} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>Nombre Cliente</label>
        <input type="text" name="NomCliente" value={formData.NomCliente || ''} onChange={handleChange} />
      </div>
    </div>

    <div className="bloque-doble">
      <div className="form-group2">
            <label>Código Grupo Cliente:</label>
            <input type="text" name="CodGrupoCliente" value={formData.CodGrupoCliente || ''} 
            // onChange={handleChange}
            readOnly
            className="input-disabled"/>
            </div>

            <div className="form-group2">
            <label>Nombre Grupo Cliente:</label>
            <input type="text" name="NomGrupoCliente" value={formData.NomGrupoCliente || ''} 
            readOnly
            className="input-disabled" />
            </div>
    </div>

     <div className="bloque-doble">
        <div className="form-group2">
           <label>Fecha Documento:</label>
       <input
              type="date"
              name="FechaCliente"
              value={formatearFecha(facturaData.FechaDoc)}
              readOnly
            className="input-disabled"
            />
          </div>
          <div className="form-group2">
           <label>Fecha Contabiliza:</label>
       <input
              type="date"
              name="FechaCliente"
              value={formatearFecha(facturaData.FechaContabilizada)}
              readOnly
            className="input-disabled"
            />
          </div>
      
    </div>

        <div className="bloque-doble">
         <div className="form-group2">
            <label>Código Tipo Persona:</label>
            <input type="text" name="CodTipoPersona" value={formData.CodTipoPersona || ''} onChange={handleChange} />
            </div>

            <div className="form-group2">
            <label>Nombre Tipo Persona:</label>
            <input type="text" name="NomTipoPersona" value={formData.NomTipoPersona || ''} 
            readOnly
            className="input-disabled" />
            </div>
        </div>

    <div className="bloque-doble">
        <div className="form-group2">
            <label>Código Lista Precios:</label>
            <input type="text" name="CodListaPrecios" value={formData.CodListaPrecios || ''} onChange={handleChange} />
            </div>

            <div className="form-group2">
            <label>Nombre Lista Precios:</label>
            <input type="text" name="NomListaPrecios" value={formData.NomListaPrecios || ''} readOnly
            className="input-disabled"/>
            </div>
        </div>

         <div className="bloque-doble">

        <div className="form-group2">
             <label>Código Vendedor Interno:</label>
            <input type="text" name="CodVendedorInt" value={formData.CodVendedorInt || ''} onChange={handleChange} />
           </div>

            <div className="form-group2">
          <label>Nombre Vendedor Interno:</label>
          <input type="text" name="NomVendedorInt" value={formData.NomVendedorInt || ''} readOnly
            className="input-disabled"/>
            </div>
        </div>

        <div className="bloque-doble">
        <div className="form-group2">
            <label>Código Vendedor Externo:</label>
            <input type="text" name="CodVendedorExt" value={formData.CodVendedorExt || ''} onChange={handleChange} />
            </div>

            <div className="form-group2">
            <label>Nombre Vendedor Externo:</label>
            <input type="text" name="NomVendedorExt" value={formData.NomVendedorExt || ''} readOnly
            className="input-disabled"/>
            </div>
            </div>

        <div className="bloque-doble">
     <div className="form-group2">
            <label>Días Crédito:</label>
            <input type="number" name="DiasCredito" value={formData.DiasCredito || ''} onChange={handleChange} />
            </div>
    <div className="form-group2">
           <label>Fecha Vencimiento:</label>
       <input
              type="date"
              name="FechaCliente"
              value={formatearFecha(formData.FechaCliente)}
              onChange={handleChange}
            />
          </div>

  </div>

  <div className="bloque-doble">
    <div className="form-group2">
            <label>Días Adicionales:</label>
            <input type="number" name="DiasAdicionales" value={formData.DiasAdicionales || ''} readOnly
            className="input-disabled"/>
            </div>
            <div className="form-group2">
            <label>% Contado:</label>
            <input type="number" name="PorcentajeContado" value={formData.PorcentajeContado || ''}readOnly
            className="input-disabled"/>
            </div>

  </div>
 <div className="bloque-doble">
    <div className="form-group2">
            <label>Monto Crédito:</label>
            <input type="number" name="MontoCredito" value={formData.MontoCredito || ''} readOnly
            className="input-disabled"/> 
            </div>
    <div className="form-group2">
            <label>Crédito Grupo:</label>
            <input type="number" name="MontoCredito" value={formData.MontoCredito || ''} readOnly
            className="input-disabled"/>
            </div>

 </div>

 <div className="bloque-doble">
      <div className="form-group2">
        <label>Plazo Entrega:</label>
        <input type="number" name="RetencionIva" value={0} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>Fecha Compromiso:</label>
        <input
              type="date"
              name="FechaCliente"
              value={formatearFecha(facturaData.FechaPromesa)}
              onChange={handleChange}
            />
       
      </div>
    </div>

  <div className="bloque-doble">
      <div className="form-group2">
        <label>Retención IVA</label>
        <input type="number" name="RetencionIva" value={formData.RetencionIva || 0} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>Exportación</label>
        <input type="checkbox" name="Exportacion" checked={formData.Exportacion || false} onChange={handleChange} />
      </div>
    </div>
  </div>

  


  <div className="contenedor-derecho">

    <div className="bloque-doble">
      <div className="form-group2">
        <label>RIF</label>
        <input type="text" name="Rif" value={formData.Rif || ''} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>NIT</label>
        <input type="text" name="Nit" value={formData.Nit || ''} onChange={handleChange} />
      </div>
    </div>
    <div className="bloque-doble">
        <div className="form-group2">
            <label>Dirección:</label>
            <input type="text" name="Direccion" value={formData.Direccion || ''} onChange={handleChange} />
            </div>
        <div className="form-group2">
            <label>País:</label>
            <input type="text" name="Pais" value={formData.Pais || ''} onChange={handleChange} />
            </div>

    </div>
     <div className="bloque-doble">
      <div className="form-group2">
        <label>Ciudad</label>
        <input type="text" name="Ciudad" value={formData.Ciudad || ''} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>Estado</label>
        <input type="text" name="Estado" value={formData.Estado || ''} onChange={handleChange} />
      </div>
    </div>

    


    <div className="bloque-doble">
      <div className="form-group2">
        <label>Teléfono 1</label>
        <input type="text" name="Telefono1" value={formData.Telefono1 || ''} onChange={handleChange} />
      </div>
      <div className="form-group2">
        <label>Teléfono 2</label>
        <input type="text" name="Telefono2" value={formData.Telefono2 || ''} onChange={handleChange} />
      </div>
    </div>
    <div className="bloque-doble">
      <div className="form-group2">
        <label>Email</label>
        <input type="email" name="Email" value={formData.Email || ''} onChange={handleChange} />
      </div>
      <div className="form-group2">
            <label>Fax:</label>
            <input type="text" name="Fax" value={formData.Fax || ''} onChange={handleChange} />
            </div>
      
    </div>
    <div className="bloque-doble">
        <div className="form-group2">
        <label>Actividad</label>
        <input type="text" name="Actividad" value={formData.Observaciones || ''} onChange={handleChange} />
      </div>

    </div>
    

   

    <div className='contenedor-subsub'>

        <div className="bloque-doble">
             <div className="form-group2">
            <label>Fecha:</label>
            <input type="text" name="Equipo" value={facturaData.Nula || ''} readOnly
            className="input-disabled"/>
            </div>
            <div className="form-group2">
            <label>Fecha Nula:</label>
            <input type="text" name="Usuario" value={facturaData.FechaNula || ''} readOnly
            className="input-disabled"/>
            </div>

        </div>

        <div className="bloque-doble">
             <div className="form-group2">
            <label>Equipo:</label>
            <input type="text" name="Equipo" value={formData.Equipo || ''} readOnly
            className="input-disabled"/>
            </div>
            <div className="form-group2">
            <label>Equipo Nula:</label>
            <input type="text" name="Usuario" value={facturaData.EquipoNula || ''} readOnly
            className="input-disabled"/>
            </div>

        </div>

        <div className="bloque-doble">
             <div className="form-group2">
            <label>Usuario:</label>
            <input type="text" name="Equipo" value={formData.Equipo || ''} readOnly
            className="input-disabled"/>
            </div>
            <div className="form-group2">
            <label>Usuario Nula:</label>
            <input type="text" name="Usuario" value={facturaData.UsuarioNula || ''} readOnly
            className="input-disabled"/>
            </div>

        </div>
        <div className="bloque-doble">
             <div className="form-group2">
            <label>Comentario Nula:</label>
            <input type="text" name="Equipo" value={facturaData.ComentarioNula || ''} readOnly
            className="input-disabled"/>
            </div>
            

        </div>
       

       


    </div>

 
  </div>
</form>

      ) : (
        <p>No se encontró ninguna factura con ese número de documento.</p>
      )}
    </div>
  );
}

export default NuevoFacturacion;

