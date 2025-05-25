import React, { useState, useEffect } from 'react';
import '../../Styles/FacturacionVentas.css';
import MenuPage from '../../Components/MenuPage';
import TablaListadoFcaturacion from '../../Components/TablaListadoFcaturacion';
// import AccordionSection from '../../Components/AccordionSection';
import InfoClienteDespacho from '../../Components/InfoClienteDespacho';
import FiltrosBusquedaListadoFact from '../../Components/FiltrosBusquedaListadoFact';




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
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [resultados, setResultados] = useState([]); 
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    nombreSucursal: '',
    nombreCliente: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaDesde: '',
    fechaHasta: ''
  });


  
  const resultadosFiltrados = resultados.filter((item) => {
    const coincideSucursal = !filtros.nombreSucursal || item.codigoSucursal?.toLowerCase().includes(filtros.nombreSucursal.toLowerCase());
  
    const coincideCliente =
      !filtros.nombreCliente || item.cliente?.toLowerCase().includes(filtros.nombreCliente.toLowerCase());
  
    const coincideTipoDoc =
      !filtros.tipoDocumento || item.tipoDocumento?.toLowerCase().includes(filtros.tipoDocumento.toLowerCase());
  
    const coincideNumeroDoc =
      !filtros.numeroDocumento || item.numeroDocumento?.toLowerCase().includes(filtros.numeroDocumento.toLowerCase());
  
    const coincideFecha =
      (!filtros.fechaDesde || item.fecha >= filtros.fechaDesde) &&
      (!filtros.fechaHasta || item.fecha <= filtros.fechaHasta);
  
    return coincideSucursal && coincideCliente && coincideTipoDoc && coincideNumeroDoc && coincideFecha;
  });
  



function obtenerHora12Horas(isoString) {
  const fecha = new Date(isoString);
  const opciones = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC', // o tu zona horaria, como 'America/Caracas'
  };
  return fecha.toLocaleTimeString('es-VE', opciones);
}


const fetchClienteInfo = async (numeroDocumento) => {
  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nDocumento: numeroDocumento })
    });

    if (!response.ok) {
      throw new Error("Error al consultar información del cliente");
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return null;
  }
};

const handleRowSelect = async (itemSeleccionado) => {
  const clienteData = await fetchClienteInfo(itemSeleccionado.numeroDocumento);

  if (clienteData) {
    // Combina la info del item original (factura) con la del cliente
    const facturaConCliente = {
      ...itemSeleccionado,
      clienteData: clienteData
    };

    setFacturaSeleccionada(facturaConCliente);
  }
};


const handleConsultar = async () => {
  // Obtener los valores desde los filtros
  const {
    nombreSucursal,
    nombreCliente,
    tipoDocumento,
    numeroDocumento,
    fechaDesde,
    fechaHasta
  } = filtros;

  // Si el filtro de sucursal tiene valor, lo usamos como codSucursal
  // const codSucursalFinal = nombreSucursal
  //   ? sucursales.find((s) =>
  //       s.Nombre.toLowerCase().includes(nombreSucursal.toLowerCase())
  //     )?.Codigo || codigoSucursal
  //   : codigoSucursal;

  const normalizar = (txt) => txt?.trim().toLowerCase();

// const codSucursalFinal = nombreSucursal
//   ? (
//       sucursales.find((s) => {
//         const entrada = normalizarTexto(nombreSucursal);
//         const nombreSucursalDB = normalizarTexto(s.NomSucursal);
//         const codigoSucursalDB = normalizarTexto(s.CodSucursal);

//         // Coincide si el usuario escribe el nombre o el código
//         return nombreSucursalDB.includes(entrada) || codigoSucursalDB === entrada;
//       })?.codigoSucursal || codigoSucursal
//     )
//   : codigoSucursal;

const codSucursalFinal = nombreSucursal
    ? (
        sucursales.find(s => {
          const entrada = normalizar(nombreSucursal);
          const nomDB = normalizar(s.NomSucursal);
          const codDB = normalizar(s.CodSucursal);
          // Coincide si el usuario escribe parte del nombre o el código exacto
          return nomDB.includes(entrada) || codDB === entrada;
        })?.CodSucursal  // devolvemos el CodSucursal del objeto encontrado
       ) || codigoSucursal  // o bien el código actual si no se encontró
    : codigoSucursal;


  const codTipoDocFinal = tipoDocumento || codSeleccionado;
  const fechaInicioFinal = fechaDesde || "2016-01-01";
  const fechaFinFinal = fechaHasta || "2016-01-01";

  const payload = {
    codEmpresa: codigoEmpresa,
    codSucursal: codSucursalFinal,
    codTipoDoc: codTipoDocFinal,
    fechaInicio: fechaInicioFinal,
    fechaFin: fechaFinFinal,
  };

  console.log("Payload enviado:", payload);

  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/listado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 404) {
        setMensajeError('No se encontraron resultados para la consulta.');
        setMostrarModalError(true);
      } else {
        setMensajeError('Ocurrió un error al consultar los datos.');
        setMostrarModalError(true);
      }
      setResultados([]);
      return;
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.data)) {
      const resultadosTransformados = data.data.map((item) => ({
        tipoDocumento: item.CodTipoDoc,
        codigoSucursal: item.CodSucursal,
        fecha: item.Fecha?.split("T")[0],
        hora: obtenerHora12Horas(item.Fecha),
        numeroDocumento: item.NDocumento,
        codigoCliente: item.CodCliente,
        cliente: item.NomCliente,
        tasa: item.TipoCambioBCV ?? 0,
        monto: item.MontoBase,
        montoIVA: item.MontoIVA,
        igtf: item.IGTF,
        total: item.MontoTotal,
        nula: item.Nula,
      }));

      // Aplicar filtros adicionales por nombreCliente y numeroDocumento exactos
      const filtradosFinal = resultadosTransformados.filter((item) => {
        const coincideCliente =
          !nombreCliente || item.cliente?.toLowerCase() === nombreCliente.toLowerCase();
        const coincideNumeroDoc =
          !numeroDocumento || item.numeroDocumento?.toLowerCase() === numeroDocumento.toLowerCase();
        return coincideCliente && coincideNumeroDoc;
      });

      // Actualizar también el número de documento en el input y el tipo doc si vinieron por filtro
      if (numeroDocumento) {
        setNumeroDocumento(numeroDocumento); // Esto actualiza el input #Documento
      }

      if (tipoDocumento) {
        setCodSeleccionado(tipoDocumento); // Esto actualiza el select de tipo doc
      }

      if (nombreSucursal && codSucursalFinal !== codigoSucursal) {
        setCodigoSucursal(codSucursalFinal); // Actualiza el input con el código correspondiente
      }

      setResultados(filtradosFinal);
      setMostrarFiltros(true);
      console.log("Datos recibidos filtrados:", filtradosFinal);
    } else {
      console.error("Respuesta no esperada:", data);
    }
  } catch (error) {
    console.error("Error al consultar:", error);
  }
};



  
 
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
  
          if (json.success && json.data.CodEmpresa === codigoEmpresa) {
            setNombreEmpresa(json.data.NomEmpresa);
            setEmpresaData(json.data);
  
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
  console.log("Sucursales:", sucursales);


  return (
    <div className='bill'>
      <div className='Buscador'>
      <MenuPage onConsultar={handleConsultar}
      onModificar={() => alert('Modificar clicked!')}
      onNuevo={() => alert('Nuevo clicked!')}
      onAnular={() => alert('Anular clicked!')}/>

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
        {/* <TablaListadoFcaturacion  data={resultados}/> */}
        {/* <TablaListadoFcaturacion resultados={resultados} onRowSelect={setFacturaSeleccionada} /> */}
        {mostrarFiltros && (
          <FiltrosBusquedaListadoFact filtros={filtros} setFiltros={setFiltros} />
        )}
        <TablaListadoFcaturacion
          // resultados={resultados}
          resultados={mostrarFiltros ? resultadosFiltrados : resultados}
          onRowSelect={handleRowSelect}
        />

      
    
      </div>
      <div>
      {facturaSeleccionada && (
  <InfoClienteDespacho item={facturaSeleccionada} />
)}
      </div>
      
    </div>
  );
}

export default Facturacion;

// import React, { useState, useEffect } from 'react';
// import '../../Styles/FacturacionVentas.css';
// import MenuPage from '../../Components/MenuPage';
// import TablaListadoFcaturacion from '../../Components/TablaListadoFcaturacion';
// // import AccordionSection from '../../Components/AccordionSection';
// import InfoClienteDespacho from '../../Components/InfoClienteDespacho';




// function Facturacion() {
//   const [codigoEmpresa, setCodigoEmpresa] = useState('');
//   const [nombreEmpresa, setNombreEmpresa] = useState('');
//   const [codigoSucursal, setCodigoSucursal] = useState('');
//   const [nombreSucursal, setNombreSucursal] = useState('');
//   const [sucursales, setSucursales] = useState([]);
//   const [moneda, setMoneda] = useState('');
//   const [empresaData, setEmpresaData] = useState(null);
//   const [codSeleccionado, setCodSeleccionado] = useState('');
//   const [nomTipoDoc, setNomTipoDoc] = useState('');
//   const [numeroDocumento, setNumeroDocumento] = useState('');
//   const [simboloMoneda, setSimboloMoneda] = useState('');
//   const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
//   const [resultados, setResultados] = useState([]); 
//   const [mostrarModalError, setMostrarModalError] = useState(false);
//   const [mensajeError, setMensajeError] = useState('');


// function obtenerHora12Horas(isoString) {
//   const fecha = new Date(isoString);
//   const opciones = {
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'UTC', // o tu zona horaria, como 'America/Caracas'
//   };
//   return fecha.toLocaleTimeString('es-VE', opciones);
// }



// const fetchClienteInfo = async (numeroDocumento) => {
//   try {
//     const response = await fetch("http://localhost:3000/api/ventas/factura/cliente", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ nDocumento: numeroDocumento })
//     });

//     if (!response.ok) {
//       throw new Error("Error al consultar información del cliente");
//     }

//     const data = await response.json();
//     return data.success ? data.data : null;
//   } catch (error) {
//     console.error("Error al obtener cliente:", error);
//     return null;
//   }
// };

// const handleRowSelect = async (itemSeleccionado) => {
//   const clienteData = await fetchClienteInfo(itemSeleccionado.numeroDocumento);

//   if (clienteData) {
//     // Combina la info del item original (factura) con la del cliente
//     const facturaConCliente = {
//       ...itemSeleccionado,
//       clienteData: clienteData
//     };

//     setFacturaSeleccionada(facturaConCliente);
//   }
// };



// const handleConsultar = async () => {
//   const payload = {
//     codEmpresa: codigoEmpresa,
//     codSucursal: codigoSucursal,
//     codTipoDoc: codSeleccionado,
//     fechaInicio: "2016-01-01", // Puedes permitir que el usuario seleccione fechas
//     fechaFin: "2016-01-01",
//   };

//   console.log("Payload enviado:", payload);

//   try {
//     const response = await fetch("http://localhost:3000/api/ventas/factura/listado", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });
//     if (!response.ok) {
//       if (response.status === 404) {
//         setMensajeError('No se encontraron resultados para la consulta.');
//         setMostrarModalError(true);
//       } else {
//         setMensajeError('Ocurrió un error al consultar los datos.');
//         setMostrarModalError(true);
//       }
//       setResultados([]); // Limpiar resultados
//       return;
//     }

//     const data = await response.json();

// if (data.success && Array.isArray(data.data)) {
//   const resultadosTransformados = data.data.map((item) => ({
    
//     tipoDocumento: item.CodTipoDoc,
//     codigoSucursal: item.CodSucursal,
//     fecha: item.Fecha?.split("T")[0],
//     hora: obtenerHora12Horas(item.Fecha),

//     numeroDocumento: item.NDocumento,
//     codigoCliente: item.CodCliente,
//     cliente: item.NomCliente,
//     tasa: item.TipoCambioBCV ?? 0,
//     // tasa: item.TipoCambioBCV != null ? item.TipoCambioBCV : 0,
//     monto: item.MontoBase,
//     montoIVA: item.MontoIVA,
//     igtf: item.IGTF,
//     total: item.MontoTotal,
//     nula: item.Nula,
//   }));



//   setResultados(resultadosTransformados);
//   console.log("Datos recibidos:", resultados);

// } else {
//   console.error("Respuesta no esperada:", data);
// }


//   } catch (error) {
//     console.error("Error al consultar:", error);
//   }
// };


  
 
//   const handleEmpresaInput = (e) => {
//     setCodigoEmpresa(e.target.value);
//   };

//   // const extraerHora = (fechaISO) => {
//   //   if (!fechaISO) return '';
//   //   const hora = new Date(fechaISO).toLocaleTimeString('es-VE', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //     second: '2-digit',
//   //     hour12: false // puedes cambiar a true si prefieres AM/PM
//   //   });
//   //   return hora;
//   // };
  

//   const buscarDatos = async (empresa, sucursal, tipoDoc) => {
//     // Limpiar estado antes de buscar
//     setNombreEmpresa('');
//     setNombreSucursal('');
//     setSucursales([]);
//     setMoneda('');
//     setSimboloMoneda('');
//     setEmpresaData(null);
//     setNomTipoDoc('');
//     setNumeroDocumento('');
  
//     if (!empresa.trim()) return;
  
//     const hasEmpresa = empresa.trim();
//     const hasSucursal = sucursal?.trim();
//     const hasTipoDoc = tipoDoc?.trim();
  
//     try {
//       if (hasEmpresa && !hasSucursal && !hasTipoDoc) {
//         // Solo Empresa
//         const response = await fetch('http://localhost:3000/api/ventas/factura/formulario', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ codEmpresa: empresa }),
//         });
  
//         const json = await response.json();
  
//         if (json.success && json.data.CodEmpresa === empresa) {
//           setNombreEmpresa(json.data.NomEmpresa);
//           setSucursales(json.data.Sucursales || []);
//           setEmpresaData(json.data);
//           const simbolo = json.data.Simbolo;
//           const simboloToMoneda = { 'Bs.': 'BS', '$': 'USD', 'USD': 'USD' };
//           setMoneda(simboloToMoneda[simbolo] || '');
//           setSimboloMoneda(simbolo);
//         } else {
//           setNombreEmpresa('No encontrada');
//           setMoneda('Seleccione');
//         }
//       } else if (hasEmpresa && hasSucursal && hasTipoDoc) {
//         // Empresa + Sucursal + TipoDoc
//         const payload = {
//           codEmpresa: empresa,
//           codSucursal: sucursal,
//           codTipoDoc: tipoDoc,
//         };
  
//         const response = await fetch('http://localhost:3000/api/ventas/factura/formulario', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });
  
//         const json = await response.json();
  
//           if (json.success && json.data.CodEmpresa === codigoEmpresa) {
//             setNombreEmpresa(json.data.NomEmpresa);
//             setEmpresaData(json.data);
  
//           const simbolo = json.data.Simbolo;
//           const simboloToMoneda = { 'Bs.': 'BS', '$': 'USD', 'USD': 'USD' };
//           setMoneda(simboloToMoneda[simbolo] || '');
//           setSimboloMoneda(simbolo);
//         } else {
//           setNombreEmpresa('No encontrada');
//           setMoneda('Seleccione');
//         }
//       } else {
//         console.warn('Debe completar todos los campos necesarios para la búsqueda.');
//       }
//     } catch (error) {
//       console.error('Error al buscar empresa:', error);
//     }
//   };
  
//   // Evento keyDown para inputs de empresa y sucursal
//   const handleEmpresaKeyDown = async (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       await buscarDatos(codigoEmpresa, codigoSucursal, codSeleccionado);
//     }
//   };
  
//   const handleTipoDocChange = (e) => {
//     const nuevoTipoDoc = e.target.value;
//     setCodSeleccionado(nuevoTipoDoc);
  
//     if (!empresaData || !codigoSucursal) {
//       setNomTipoDoc('');
//       setNumeroDocumento('');
//       return;
//     }
  
//     const sucursalData = Array.isArray(empresaData.Sucursales)
//       ? empresaData.Sucursales.find(
//           (s) => s.CodSucursal?.toLowerCase() === codigoSucursal.toLowerCase()
//         )
//       : empresaData.Sucursal?.CodSucursal?.toLowerCase() === codigoSucursal.toLowerCase()
//       ? empresaData.Sucursal
//       : null;
  
//     if (sucursalData) {
//       const documento = sucursalData.Documentos?.find(
//         (doc) => doc.CodTipoDoc === nuevoTipoDoc
//       );
  
//       if (documento) {
//         setNomTipoDoc(documento.NomTipoDoc || 'No encontrado');
//         setNumeroDocumento(documento.NDocumento || 'No encontrado');
//       } else {
//         setNomTipoDoc('Documento no encontrado');
//         setNumeroDocumento('No encontrado');
//       }
//     } else {
//       setNomTipoDoc('Sucursal no encontrada');
//       setNumeroDocumento('No encontrado');
//     }
//   };

//   const handleSucursalKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();

//       const sucursalEncontrada = sucursales.find(
//         (suc) => suc.CodSucursal.toLowerCase() === codigoSucursal.toLowerCase()
//       );

//       if (sucursalEncontrada) {
//         setNombreSucursal(sucursalEncontrada.NomSucursal);
//         if (codSeleccionado) {
//           const documento = sucursalEncontrada.Documentos.find(
//             (doc) => doc.CodTipoDoc === codSeleccionado
//           );
  
//           if (documento) {
//             setNumeroDocumento(documento.NDocumento);
//           } else {
//             setNumeroDocumento('No encontrado');
//           }
//         }
//       } else {
//         setNombreSucursal('No encontrada');
//         setNumeroDocumento('');
//       }
//     }
//   };

//   return (
//     <div className='bill'>
//       <div className='Buscador'>
//       <MenuPage onConsultar={handleConsultar}
//       onModificar={() => alert('Modificar clicked!')}
//       onNuevo={() => alert('Nuevo clicked!')}
//       onAnular={() => alert('Anular clicked!')}/>

//       </div>

//       <div className='gran-container'>


//         {/* Formulario Izquierdo */}
//         <div className='files'>
//           <form>
//             <div className="form-row">
            
//               <div className="form-group">
//                 <label>Código Empresa:</label>
//                 <input
//                   type="text"
//                   className="input-small"
//                   value={codigoEmpresa}
//                   onChange={handleEmpresaInput}
//                   onKeyDown={handleEmpresaKeyDown}
//                   placeholder="Ej: 01"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Empresa:</label>
//                 <input type="text" value={nombreEmpresa} readOnly className='input-big' />
//               </div>
//               <div className="form-group">
//                 <label> Tipo Documento:</label>
//                 <select
//                   className="desplegable"
//                   value={codSeleccionado}
//                   onChange={(handleTipoDocChange) }>
//                     <option value="">-- Selecciona --</option>
//                     <option value="F">F</option>
//                     <option value="P">P</option>
//                     <option value="NC">NC</option>
//                     <option value="ND">ND</option>
//                     <option value="OI">OI</option>
                   
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Nombre Documento:</label>
//                 <input type="text" value={nomTipoDoc} readOnly  className='input-big' />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Código Sucursal:</label>
//                 <input
//                   type="text"
//                   className="input-small"
//                   value={codigoSucursal}
//                   onChange={(e) => setCodigoSucursal(e.target.value)}
//                   onKeyDown={handleSucursalKeyDown}
//                   placeholder="Ej: A"
//                   disabled={!nombreEmpresa}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Sucursal:</label>
//                 <input type="text" value={nombreSucursal} readOnly  className='input-big'/>
//               </div>
//               <div className="form-group">
//                 <label># Documento:</label>
//                 <input
//                   type="text"
//                   className="input-small"
//                   value={numeroDocumento}
//                   onChange={(e) => setCodigoSucursal(e.target.value)}
//                   onKeyDown={handleSucursalKeyDown}
//                   placeholder="Ej: A"
//                   // disabled={!nombreEmpresa}
//                 />
//               </div>
//               <div className="form-group">
//                 <label># Control:</label>
//                 <input type="text" value={nombreSucursal} readOnly  className="input-small"/>
//               </div>
//               <div className="form-group">
//                 <label>Moneda:</label>
//                 <select
//                   className="desplegable"
//                   value={moneda}
//                   onChange={(e) => setMoneda(e.target.value)}
                  
//                 >
//                   <option value="">Seleccione</option>
//                   <option value="USD">USD</option>
//                   <option value="BS">BS</option>
//                 </select>
//               </div>
//             </div>
//           </form>
//         </div>

      
//       </div>
//       <div>
//         {/* <TablaListadoFcaturacion  data={resultados}/> */}
//         {/* <TablaListadoFcaturacion resultados={resultados} onRowSelect={setFacturaSeleccionada} /> */}
//         <TablaListadoFcaturacion
//           resultados={resultados}
//           onRowSelect={handleRowSelect}
//         />

      
    
//       </div>
//       <div>
//       {facturaSeleccionada && (
//   <InfoClienteDespacho item={facturaSeleccionada} />
// )}
//       </div>
      
//     </div>
//   );
// }

// export default Facturacion;


