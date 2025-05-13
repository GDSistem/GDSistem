import React, { useState, useEffect } from 'react';
import '../../Styles/FacturacionVentas.css';
import MenuPage from '../../Components/MenuPage';
import AccordionSection from '../../Components/AccordionSection';



function Facturacion() {
  const [codigoEmpresa, setCodigoEmpresa] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [codigoSucursal, setCodigoSucursal] = useState('');
  const [nombreSucursal, setNombreSucursal] = useState('');

  const [sucursales, setSucursales] = useState([]);
  const [moneda, setMoneda] = useState('');
  // const [tipo, setTipo] = useState('');
  // const [documentos, setDocumentos] = useState([]);


  const [codSeleccionado, setCodSeleccionado] = useState('');
  const [nomTipoDoc, setNomTipoDoc] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');

  
  // const handleTipoDocChange = async (e) => {
  //   const tipoDoc = e.target.value;  // Obtienes el tipo de documento seleccionado
  //   setCodSeleccionado(tipoDoc);  // Actualizas el estado del tipo de documento seleccionado
  
  //   if (tipoDoc) {
  //     try {
  //       // Realizas la solicitud al servidor
  //       const response = await fetch('http://localhost:3000/api/documento/codDocumento', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ codDocumento: tipoDoc }),  // Envías el tipo de documento
  //       });
  
  //       const json = await response.json();
  
  //       if (json.success && json.data) {
  //         // Actualizas los estados con la respuesta del servidor
  //         setNomTipoDoc(json.data.NomTipoDoc);
  //         setNumeroDocumento(json.data.NDocumento);
  //       } else {
  //         setNomTipoDoc('No encontrado');
  //         setNumeroDocumento('');
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener el documento:', error);
  //     }
  //   }
  // };

  // const handleTipoDocChange = async (e) => {
  //   const tipoDoc = e.target.value;  // Obtienes el tipo de documento seleccionado
  //   setCodSeleccionado(tipoDoc);  // Actualizas el estado del tipo de documento seleccionado
  
  //   // Validar que los tres datos necesarios estén presentes
  //   if (!codigoEmpresa || !nombreEmpresa || !tipoDoc) {
  //     // Si no están presentes, no realizamos la solicitud y limpiamos los campos
  //     setNomTipoDoc('');
  //     setNumeroDocumento('');
  //     return;
  //   }
  
  //   try {
  //     // Realizas la solicitud al servidor
  //     const response = await fetch('http://localhost:3000/api/documento/codDocumento', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         codDocumento: tipoDoc, 
  //         codEmpresa: codigoEmpresa, // Incluimos el código de la empresa
  //         nomEmpresa: nombreEmpresa  // Incluimos el nombre de la empresa
  //       }),  
  //     });
  
  //     const json = await response.json();
  
  //     if (json.success && json.data) {
  //       // Actualizas los estados con la respuesta del servidor
  //       setNomTipoDoc(json.data.NomTipoDoc);
  //       setNumeroDocumento(json.data.NDocumento);
  //     } else {
  //       setNomTipoDoc('No encontrado');
  //       setNumeroDocumento('');
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener el documento:', error);
  //   }
  // };
  
  const handleTipoDocChange = async (e) => {
    const tipoDoc = e.target.value;  // Obtienes el tipo de documento seleccionado
    setCodSeleccionado(tipoDoc);  // Actualizas el estado del tipo de documento seleccionado
  
    // Validar que el tipo de documento esté seleccionado para obtener su nombre
    if (tipoDoc) {
      try {
        // Realizas la solicitud al servidor solo para obtener el nombre del documento
        const response = await fetch('http://localhost:3000/api/documento/codDocumento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codDocumento: tipoDoc }),  // Envío solo el tipo de documento
        });
  
        const json = await response.json();
  
        if (json.success && json.data) {
          // Actualizas los estados con el nombre del documento
          setNomTipoDoc(json.data.NomTipoDoc);
        } else {
          setNomTipoDoc('No encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el nombre del documento:', error);
      }
    }
  
    // Solo obtener el número de documento cuando todos los valores estén presentes
    if (codigoEmpresa && nombreEmpresa && tipoDoc) {
      try {
        const response = await fetch('http://localhost:3000/api/documento/codDocumento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            codDocumento: tipoDoc,
            codEmpresa: codigoEmpresa,
            nomEmpresa: nombreEmpresa 
          }),  
        });
  
        const json = await response.json();
  
        if (json.success && json.data) {
          // Actualizas el estado con el número de documento
          setNumeroDocumento(json.data.NDocumento);
        } else {
          setNumeroDocumento('');
        }
      } catch (error) {
        console.error('Error al obtener el número del documento:', error);
      }
    } else {
      // Si no se cumplen las condiciones, limpiamos el número de documento
      setNumeroDocumento('');
    }
  };
  
  
 
  const handleEmpresaInput = (e) => {
    setCodigoEmpresa(e.target.value);
  };

  const handleEmpresaKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      setNombreEmpresa('');
      setCodigoSucursal('');
      setNombreSucursal('');
      setSucursales([]);

      if (codigoEmpresa.length > 0) {
        try {
          const response = await fetch('http://localhost:3000/api/empresa/codEmpresa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codEmpresa: codigoEmpresa }),
          });

          const json = await response.json();

          if (json.success && json.data.CodEmpresa === codigoEmpresa) {
            setNombreEmpresa(json.data.NomEmpresa);
            setSucursales(json.data.Sucursales);
          } else {
            setNombreEmpresa('No encontrada');
          }
        } catch (error) {
          console.error('Error al buscar empresa:', error);
        }
      }
    }
  };

  const handleSucursalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const sucursalEncontrada = sucursales.find(
        (suc) => suc.CodSucursal.toLowerCase() === codigoSucursal.toLowerCase()
      );

      if (sucursalEncontrada) {
        setNombreSucursal(sucursalEncontrada.NomSucursal);
      } else {
        setNombreSucursal('No encontrada');
      }
    }
  };

  return (
    <div className='bill'>
      <div className='Buscador'>
      <MenuPage/>

      </div>

      <div className='gran-container'>


        {/* Formulario Izquierdo */}
        <div className='files'>
          <form>
            <div className="form-row">
            
              <div className="form-group">
                <label>Código Empresa:</label>
                <input
                  type="text"
                  className="input-small"
                  value={codigoEmpresa}
                  onChange={handleEmpresaInput}
                  onKeyDown={handleEmpresaKeyDown}
                  placeholder="Ej: 01"
                />
              </div>
              <div className="form-group">
                <label>Empresa:</label>
                <input type="text" value={nombreEmpresa} readOnly className='input-big' />
              </div>
              <div className="form-group">
                <label> Tipo Documento:</label>
                <select
                  className="desplegable"
                  value={codSeleccionado}
                  onChange={(handleTipoDocChange) }>
                    <option value="">-- Selecciona --</option>
                    <option value="F">F</option>
                    <option value="P">P</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OI">OI</option>
                   
                </select>
              </div>
              <div className="form-group">
                <label>Nombre Documento:</label>
                <input type="text" value={nomTipoDoc} readOnly  className='input-big' />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Código Sucursal:</label>
                <input
                  type="text"
                  className="input-small"
                  value={codigoSucursal}
                  onChange={(e) => setCodigoSucursal(e.target.value)}
                  onKeyDown={handleSucursalKeyDown}
                  placeholder="Ej: A"
                  disabled={!nombreEmpresa}
                />
              </div>
              <div className="form-group">
                <label>Sucursal:</label>
                <input type="text" value={nombreSucursal} readOnly  className='input-big'/>
              </div>
              <div className="form-group">
                <label># Documento:</label>
                <input
                  type="text"
                  className="input-small"
                  value={numeroDocumento}
                  onChange={(e) => setCodigoSucursal(e.target.value)}
                  onKeyDown={handleSucursalKeyDown}
                  placeholder="Ej: A"
                  // disabled={!nombreEmpresa}
                />
              </div>
              <div className="form-group">
                <label># Control:</label>
                <input type="text" value={nombreSucursal} readOnly  className="input-small"/>
              </div>
              <div className="form-group">
                <label># Doc. Origen:</label>
                <input
                  type="text"
                  className="input-small"
                  value={codigoSucursal}
                  onChange={(e) => setCodigoSucursal(e.target.value)}
                  onKeyDown={handleSucursalKeyDown}
                  placeholder="Ej: A"
                  disabled={!nombreEmpresa}
                />
              </div>
              <div className="form-group">
                <label>Moneda:</label>
                <select
                  className="desplegable"
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value)}
                  
                >
                  <option value="">Seleccione</option>
                  <option value="USD">USD</option>
                  <option value="BS">BS</option>
                </select>
              </div>
            </div>
          </form>
        </div>

      
      </div>
      <div>
      <AccordionSection 
      sections={[
        {
          title: 'Datos del Cliente',
          content: (
            <div className='huge-container'>
              <div className='acordeon-container'>
              <div className="formulario-acordeon">
              <label>Empresa:</label>
              <input type="text" value={nombreEmpresa} readOnly />
              {/* <label>Empresa Seleccionada:</label> */}
              <input type="text" value={nombreEmpresa} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Sucursal:</label>
              <input type="text" value={nombreSucursal} readOnly />
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              <div className="formulario-acordeon">
              <label>Fecha Documento</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Fecha Contabilizada</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              <div className="formulario-acordeon">
              <label>Tipo Persona:</label>
              <input type="text" value={nombreSucursal} readOnly />
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              <div className="formulario-acordeon">
              <label>Lista Precios:</label>
              <input type="text" value={nombreSucursal} readOnly />
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              <div className="formulario-acordeon">
              <label>Vendedor Interno:</label>
              <input type="text" value={nombreSucursal} readOnly />
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Vendedor Externo:</label>
              <input type="text" value={nombreSucursal} readOnly />
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Días Credito</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Fecha Vencimiento</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Días Adicionales</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>% Contado</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Monto Credito</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Credito Grupo</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              <div className="formulario-acordeon">
              <label>Plazo entrega</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Fecha Compromiso</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Exportación</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Retención Iva</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Fecha</label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Fecha Nula</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Equipo </label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Equipo Nula</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>

              <div className="formulario-acordeon">
              <label>Usuario </label>
              <input type="text" value={nombreSucursal} readOnly />
              <label>Usuario Nula</label>
              <input type="text" value={nombreSucursal} readOnly />

              </div>
              
            </div>

            {/* Contenedor Derecho */}
            <div className='acordeon-container'>
              <div className="formulario-acordeon">
              <label>Rif:</label>
              <input type="text" value={nombreEmpresa} readOnly />
              <label>Nit:</label>
              <input type="text" value={nombreEmpresa} readOnly />
              
              </div>
              <div className="formulario-acordeon">
              <label>Dirección:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Ciudad:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Estado:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>País:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Teléfono 1:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Teléfono 2:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Fax:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>E-mail:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>
              <div className="formulario-acordeon">
              <label>Comentario Doc:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>

              <div className="formulario-acordeon">
              <label>Comentario Nula:</label>
              <input type="text" value={nombreSucursal} readOnly />
              </div>

            </div>

            </div>
            
            

            
            
          ),
        },
        {
          title: 'Detalles del Documento',
          content: (
            <div className="formulario-acordeon">
              <label>Tipo Documento:</label>
              <input type="text" value={moneda} readOnly />
    
              <label>Moneda:</label>
              <input type="text" value={moneda} readOnly />
            </div>
          ),
        },
        // puedes agregar más secciones aquí
      ]}/>
      
    
      </div>
      
    </div>
  );
}

export default Facturacion;


