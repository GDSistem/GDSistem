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
  const [empresaData, setEmpresaData] = useState(null);
  const [codSeleccionado, setCodSeleccionado] = useState('');
  const [nomTipoDoc, setNomTipoDoc] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');

const [simboloMoneda, setSimboloMoneda] = useState('');



  // const handleTipoDocChange = async (e) => {
  //   const tipoDoc = e.target.value;  // Obtienes el tipo de documento seleccionado
  //   setCodSeleccionado(tipoDoc);  // Actualizas el estado del tipo de documento seleccionado
  
  //   // Validar que el tipo de documento esté seleccionado para obtener su nombre
  //   if (tipoDoc) {
  //     try {
  //       // Realizas la solicitud al servidor solo para obtener el nombre del documento
  //       const response = await fetch('http://localhost:3000/api/documento/codDocumento', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ codDocumento: tipoDoc }),  // Envío solo el tipo de documento
  //       });
  
  //       const json = await response.json();
  
  //       if (json.success && json.data) {
  //         // Actualizas los estados con el nombre del documento
  //         setNomTipoDoc(json.data.NomTipoDoc);
  //       } else {
  //         setNomTipoDoc('No encontrado');
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener el nombre del documento:', error);
  //     }
  //   }

  //   if (empresaData && codigoSucursal && tipoDoc) {
  //     const sucursal = empresaData.Sucursales.find(
  //       (suc) => suc.CodSucursal.toLowerCase() === codigoSucursal.toLowerCase()
  //     );
  
  //     if (sucursal) {
  //       const documento = sucursal.Documentos.find(
  //         (doc) => doc.CodTipoDoc === tipoDoc
  //       );
  
  //       if (documento) {
  //         setNumeroDocumento(documento.NDocumento);
  //       } else {
  //         setNumeroDocumento('No encontrado');
  //       }
  //     } else {
  //       setNumeroDocumento('No hay');
  //     }
  //   } else {
  //     setNumeroDocumento('');
  //   }

  // };
  
  
 
  const handleEmpresaInput = (e) => {
    setCodigoEmpresa(e.target.value);
  };

  const buscarDatos = async (empresa, sucursal, tipoDoc) => {
    // Limpiar estado antes de buscar
    setNombreEmpresa('');
    setNombreSucursal('');
    setSucursales([]);
    setMoneda('');
    setSimboloMoneda('');
    setEmpresaData(null);
    setNomTipoDoc('');
    setNumeroDocumento('');
  
    if (!empresa.trim()) return;
  
    const hasEmpresa = empresa.trim();
    const hasSucursal = sucursal?.trim();
    const hasTipoDoc = tipoDoc?.trim();
  
    try {
      if (hasEmpresa && !hasSucursal && !hasTipoDoc) {
        // Solo Empresa
        const response = await fetch('http://localhost:3000/api/ventas/factura/formulario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codEmpresa: empresa }),
        });
  
        const json = await response.json();
  
        if (json.success && json.data.CodEmpresa === empresa) {
          setNombreEmpresa(json.data.NomEmpresa);
          setSucursales(json.data.Sucursales || []);
          setEmpresaData(json.data);
          const simbolo = json.data.Simbolo;
          const simboloToMoneda = { 'Bs.': 'BS', '$': 'USD', 'USD': 'USD' };
          setMoneda(simboloToMoneda[simbolo] || '');
          setSimboloMoneda(simbolo);
        } else {
          setNombreEmpresa('No encontrada');
          setMoneda('Seleccione');
        }
      } else if (hasEmpresa && hasSucursal && hasTipoDoc) {
        // Empresa + Sucursal + TipoDoc
        const payload = {
          codEmpresa: empresa,
          codSucursal: sucursal,
          codTipoDoc: tipoDoc,
        };
  
        const response = await fetch('http://localhost:3000/api/ventas/factura/formulario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
  
        const json = await response.json();
  
        if (json.success && json.data.CodEmpresa === empresa) {
          setNombreEmpresa(json.data.NomEmpresa);
          setEmpresaData(json.data);
  
          const suc = json.data.Sucursal;
          if (suc) {
            setNombreSucursal(suc.NomSucursal || '');
            const doc = suc.Documentos?.find((d) => d.CodTipoDoc === tipoDoc);
            if (doc) {
              setNomTipoDoc(doc.NomTipoDoc);
              setNumeroDocumento(doc.NDocumento);
            } else {
              setNomTipoDoc('No encontrado');
              setNumeroDocumento('No encontrado');
            }
          }
  
          const simbolo = json.data.Simbolo;
          const simboloToMoneda = { 'Bs.': 'BS', '$': 'USD', 'USD': 'USD' };
          setMoneda(simboloToMoneda[simbolo] || '');
          setSimboloMoneda(simbolo);
        } else {
          setNombreEmpresa('No encontrada');
          setMoneda('Seleccione');
        }
      } else {
        console.warn('Debe completar todos los campos necesarios para la búsqueda.');
      }
    } catch (error) {
      console.error('Error al buscar empresa:', error);
    }
  };
  
  // Evento keyDown para inputs de empresa y sucursal
  const handleEmpresaKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await buscarDatos(codigoEmpresa, codigoSucursal, codSeleccionado);
    }
  };
  
  const handleTipoDocChange = (e) => {
    const nuevoTipoDoc = e.target.value;
    setCodSeleccionado(nuevoTipoDoc);
  
    if (!empresaData || !codigoSucursal) {
      setNomTipoDoc('');
      setNumeroDocumento('');
      return;
    }
  
    const sucursalData = Array.isArray(empresaData.Sucursales)
      ? empresaData.Sucursales.find(
          (s) => s.CodSucursal?.toLowerCase() === codigoSucursal.toLowerCase()
        )
      : empresaData.Sucursal?.CodSucursal?.toLowerCase() === codigoSucursal.toLowerCase()
      ? empresaData.Sucursal
      : null;
  
    if (sucursalData) {
      const documento = sucursalData.Documentos?.find(
        (doc) => doc.CodTipoDoc === nuevoTipoDoc
      );
  
      if (documento) {
        setNomTipoDoc(documento.NomTipoDoc || 'No encontrado');
        setNumeroDocumento(documento.NDocumento || 'No encontrado');
      } else {
        setNomTipoDoc('Documento no encontrado');
        setNumeroDocumento('No encontrado');
      }
    } else {
      setNomTipoDoc('Sucursal no encontrada');
      setNumeroDocumento('No encontrado');
    }
  };
  
  
  
  
  
  

  // const handleEmpresaKeyDown = async (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();

  //     setNombreEmpresa('');
  //     setCodigoSucursal('');
  //     setNombreSucursal('');
  //     setSucursales([]);
  //     setMoneda('');
  //     setMoneda('');
  //     setSimboloMoneda('');
      

  //     if (codigoEmpresa.length > 0) {
  //       try {
  //         const response = await fetch('http://localhost:3000/api/empresa/codEmpresa', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ codEmpresa: codigoEmpresa }),
  //         });

  //         const json = await response.json();

  //         if (json.success && json.data.CodEmpresa === codigoEmpresa) {
  //           setNombreEmpresa(json.data.NomEmpresa);
  //           setSucursales(json.data.Sucursales);
  //           setEmpresaData(json.data);
  //           const simbolo = json.data.Simbolo;

  //         // Mapear símbolo a moneda interna
  //           const simboloToMoneda = {
  //           'Bs.': 'BS',
  //           '$': 'USD',
  //           'USD': 'USD',
  //         };
  //         const monedaDetectada = simboloToMoneda[simbolo] || '';
  //         setMoneda(monedaDetectada);
  //         setSimboloMoneda(simbolo); // si lo necesitas para mostrarlo
  //       } else {
  //         setNombreEmpresa('No encontrada');
  //         setMoneda('Seleccione');
  //       }

  //       } catch (error) {
  //         console.error('Error al buscar empresa:', error);
  //       }
  //     }
  //   }
  // };

  const handleSucursalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const sucursalEncontrada = sucursales.find(
        (suc) => suc.CodSucursal.toLowerCase() === codigoSucursal.toLowerCase()
      );

      if (sucursalEncontrada) {
        setNombreSucursal(sucursalEncontrada.NomSucursal);
        if (codSeleccionado) {
          const documento = sucursalEncontrada.Documentos.find(
            (doc) => doc.CodTipoDoc === codSeleccionado
          );
  
          if (documento) {
            setNumeroDocumento(documento.NDocumento);
          } else {
            setNumeroDocumento('No encontrado');
          }
        }
      } else {
        setNombreSucursal('No encontrada');
        setNumeroDocumento('');
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
              {/* <div className="form-group">
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
              </div> */}
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


