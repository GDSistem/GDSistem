import React, { useEffect, useState } from 'react';
import '../Styles/NuevoFacturacion.css'
import NuevoInfoDespacho from '../Components/NuevoInfoDespacho';


function NuevoFacturacion({ resultados, numeroDocumento }) {
  const [facturaEncontrada, setFacturaEncontrada] = useState(null);
  const [formData, setFormData] = useState({});
  const [facturaData, setFacturaData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  const verificarCliente = async (codigoCliente) => {
  if (!codigoCliente) return;

  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codCliente: codigoCliente }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setFormData(prev => ({
        ...prev,
        ...data.data,
      }));
      setModalVisible(false); // Oculta el modal si estaba visible
    } else {
      setModalMensaje("No existe un cliente con ese código.");
      setModalVisible(true);
    }
  } catch (error) {
    console.error("Error al buscar cliente:", error);
    setModalMensaje("Hubo un error al verificar el cliente.");
    setModalVisible(true);
  }
};

const verificarVendedor = async (codigo, campoCodigo, campoNombre) => {
  if (!codigo) return;

  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/vendedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codVendedor: codigo }),
    });

    const data = await response.json();

    if (response.ok && data.success && data.data.length > 0) {
      const vendedor = data.data[0];
      setFormData(prev => ({
        ...prev,
        [campoCodigo]: vendedor.CodVendedor,
        [campoNombre]: vendedor.NomVendedor
      }));
      setModalVisible(false);
    } else {
      setModalMensaje(`El código del ${campoNombre === 'NomVendedorInt' ? 'vendedor interno' : 'vendedor externo'} no existe.`);
      setModalVisible(true);
      setFormData(prev => ({
        ...prev,
        [campoNombre]: ""
      }));
    }
  } catch (error) {
    console.error("Error al verificar vendedor:", error);
    setModalMensaje("Hubo un error al verificar el vendedor.");
    setModalVisible(true);
  }
};


const verificarTipoPersona = async (codigoTipoPersona) => {
  if (!codigoTipoPersona) return;

  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/tipo-personas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codTipoPersona: codigoTipoPersona }),
    });

    const data = await response.json();

    if (response.ok && data.success && data.data.length > 0) {
      const tipoPersona = data.data[0];
      setFormData(prev => ({
        ...prev,
        CodTipoPersona: tipoPersona.CodTipoPersona,
        NomTipoPersona: tipoPersona.NomTipoPersona
      }));
      setModalVisible(false);
    } else {
      setModalMensaje("El código de tipo de persona no existe.");
      setModalVisible(true);
      setFormData(prev => ({
        ...prev,
        NomTipoPersona: "" // Borra el nombre si no existe
      }));
    }
  } catch (error) {
    console.error("Error al buscar tipo de persona:", error);
    setModalMensaje("Hubo un error al verificar el tipo de persona.");
    setModalVisible(true);
  }
};

const verificarListaPrecios = async (codigoListaPrecios) => {
  if (!codigoListaPrecios) return;

  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/lista-precios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codListaPrecios: codigoListaPrecios }),
    });

    const data = await response.json();

    if (response.ok && data.length > 0) {
      const lista = data[0];
      setFormData(prev => ({
        ...prev,
        CodListaPrecios: lista.CodListaPrecios,
        NomListaPrecios: lista.NomListaPrecios
      }));
      setModalVisible(false);
    } else {
      setModalMensaje("El código de lista de precios no existe.");
      setModalVisible(true);
      setFormData(prev => ({
        ...prev,
        NomListaPrecios: "" // Limpia si no existe
      }));
    }
  } catch (error) {
    console.error("Error al verificar lista de precios:", error);
    setModalMensaje("Hubo un error al verificar la lista de precios.");
    setModalVisible(true);
  }
};

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
      <NuevoInfoDespacho factura={facturaEncontrada} />

      {facturaEncontrada ? (
        <form className="formulario-cliente">
            
  {/* <h3>Datos del Cliente</h3> */}

  <div className="contenedor-izquierdo">
    <div className="bloque-doble">
      <div className="form-group2">
        <label>Código Cliente</label>
        {/* <input type="text" name="CodCliente" value={formData.CodCliente || ''} onChange={handleChange} /> */}
        {/* <input type="text" name="CodCliente" value={formData.CodCliente || ''} onChange={handleChange} /> */}

    <input
  type="text"
  name="CodCliente"
  value={formData.CodCliente || ''}
  onChange={handleChange}
  onBlur={(e) => verificarCliente(e.target.value)} // Detecta salida del input
/>
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
            {/* <input type="text" name="CodTipoPersona" value={formData.CodTipoPersona || ''} onChange={handleChange} /> */}
            <input
            type="text"
            name="CodTipoPersona"
            value={formData.CodTipoPersona || ''}
            onChange={handleChange}
            onBlur={(e) => verificarTipoPersona(e.target.value)} // Validación al salir del input
            />

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
            {/* <input type="text" name="CodListaPrecios" value={formData.CodListaPrecios || ''} onChange={handleChange} /> */}
            <input
            type="text"
            name="CodListaPrecios"
            value={formData.CodListaPrecios || ''}
            onChange={handleChange}
            onBlur={(e) => verificarListaPrecios(e.target.value)} // Ejecuta la verificación al salir del campo
            />

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
            {/* <input type="text" name="CodVendedorInt" value={formData.CodVendedorInt || ''} onChange={handleChange} /> */}
            <input
            type="text"
            name="CodVendedorInt"
            value={formData.CodVendedorInt || ''}
            onChange={handleChange}
            onBlur={(e) => verificarVendedor(e.target.value, "CodVendedorInt", "NomVendedorInt")}
            />

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
            {/* <input type="text" name="CodVendedorExt" value={formData.CodVendedorExt || ''} onChange={handleChange} /> */}
            <input
            type="text"
            name="CodVendedorExt"
            value={formData.CodVendedorExt || ''}
            onChange={handleChange}
            onBlur={(e) => verificarVendedor(e.target.value, "CodVendedorExt", "NomVendedorExt")}
            />

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
    {modalVisible && (
  <div className="modal-overlay">
    <div className="modal">
      <p>{modalMensaje}</p>
      <button onClick={() => setModalVisible(false)}>Cerrar</button>
    </div>
  </div>
)}


 
  </div>
</form>

      ) : (
        <p>No se encontró ninguna factura con ese número de documento.</p>
      )}

    <div>
        {/* {facturaEncontrada && <NuevoInfoDespacho factura={facturaEncontrada} />} */}
        

    </div>
    </div>
    
  );
  
}

export default NuevoFacturacion;

