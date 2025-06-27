// import React, { useEffect, useState } from 'react';
// import '../Styles/NuevoInfoDespacho.css';

// function NuevoInfoDespacho({ factura, formData }) {
//   const [activeTab, setActiveTab] = useState('Cliente');
//   const [sucursal, setSucursal] = useState(null);

//   useEffect(() => {
//     if (!factura?.codSucursal || !factura?.NomSucursal) return;

//     const obtenerSucursal = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/ventas/factura/despacho-sucursal", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             codSucursal: factura.codSucursal,
//             nomSucursal: factura.NomSucursal
//           })
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//           setSucursal(data.data);
//         } else {
//           console.error("No se pudo obtener la información de la sucursal");
//         }
//       } catch (error) {
//         console.error("Error al obtener la sucursal:", error);
//       }
//     };

//     obtenerSucursal();
//   }, [factura]);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Cliente':
//         return (
//           <div className="info-columns">
//             <div className="info-left">
//               <p><strong>Dirección:</strong> {formData.Direccion}</p>
//               <p><strong>Ciudad:</strong> {formData.Ciudad}</p>
//               <p><strong>Estado:</strong> {formData.Estado}</p>
//             </div>
//             <div className="info-right">
//               <p><strong>País:</strong> {formData.Pais}</p>
//               <p><strong>Teléfono 1:</strong> {formData.Telefono1}</p>
//               <p><strong>Teléfono 2:</strong> {formData.Telefono2}</p>
//             </div>
//           </div>
//         );
//       case 'Sucursal':
//         if (!sucursal) return <p>No hay información de sucursal disponible.</p>;
//         return (
//           <div className="info-columns">
//             <div className="info-left">
//               <p><strong>Dirección:</strong> {sucursal.Direccion}</p>
//               <p><strong>Ciudad:</strong> {sucursal.Ciudad}</p>
//               <p><strong>Estado:</strong> {sucursal.Estado}</p>
//             </div>
//             <div className="info-right">
//               <p><strong>País:</strong> {sucursal.Pais}</p>
//               <p><strong>Teléfono 1:</strong> {sucursal.Telefono1}</p>
//               <p><strong>Teléfono 2:</strong> {sucursal.Telefono2}</p>
//             </div>
//           </div>
//         );
//       case 'Otro':
//       default:
//         return (
//           <div className="info-columns">
//             <div className="info-left">
//               <p><strong>Dirección:</strong> {formData.DireccionD}</p>
//               <p><strong>Ciudad:</strong> {formData.CiudadD}</p>
//               <p><strong>Estado:</strong> {formData.EstadoD}</p>
//             </div>
//             <div className="info-right">
//               <p><strong>País:</strong> {formData.PaisD}</p>
//               <p><strong>Teléfono 1:</strong> {formData.Telefono1D}</p>
//               <p><strong>Teléfono 2:</strong> {formData.Telefono2D}</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="despacho-info">
//       <div><h3 className='titulodespacho'>Información de Despacho</h3></div>

//       <div className="tabs">
//         <button className={activeTab === 'Cliente' ? 'active' : ''} onClick={() => setActiveTab('Cliente')}>
//           Cliente
//         </button>
//         <button className={activeTab === 'Sucursal' ? 'active' : ''} onClick={() => setActiveTab('Sucursal')}>
//           Sucursal
//         </button>
//         <button className={activeTab === 'Otro' ? 'active' : ''} onClick={() => setActiveTab('Otro')}>
//           Otro
//         </button>
//       </div>

//       <div className="despacho-content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default NuevoInfoDespacho;


import React, { useEffect, useState } from 'react';
import '../Styles/NuevoInfoDespacho.css';

function NuevoInfoDespacho({ factura, formData }) {
  const [activeTab, setActiveTab] = useState('Cliente');
  const [sucursal, setSucursal] = useState(null);
  const [formDataLocal, setFormDataLocal] = useState({
    Direccion: '',
    Ciudad: '',
    Estado: '',
    Pais: '',
    Telefono1: '',
    Telefono2: '',
    DireccionD: '',
    CiudadD: '',
    EstadoD: '',
    PaisD: '',
    Telefono1D: '',
    Telefono2D: '',
    CodSucursal: '',
    NomSucursal: '',
  });

  const buscarSucursalPorCodigo = async (codigo) => {
  try {
    const response = await fetch("http://localhost:3000/api/ventas/factura/despacho-sucursal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codSucursal: codigo })
    });

    const data = await response.json();

    if (response.ok && data) {
      setSucursal(data);
      setFormDataLocal(prev => ({
        ...prev,
        CodSucursal: data.CodSucursal,
        NomSucursal: data.NomSucursal,
        DireccionS: data.Direccion,
        CiudadS: data.Ciudad,
        EstadoS: data.Estado,
        PaisS: data.Pais,
        Telefono1S: data.Telefono1,
        Telefono2S: data.Telefono2,
      }));
    } else {
      console.error("No se encontró la sucursal");
    }
  } catch (error) {
    console.error("Error al buscar sucursal:", error);
  }
};


  useEffect(() => {
    if (formData) {
      setFormDataLocal(prev => ({
        ...prev,
        ...formData
      }));
    }
  }, [formData]);

  useEffect(() => {
    if (!factura?.codSucursal || !factura?.NomSucursal) return;

    const obtenerSucursal = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ventas/factura/despacho-sucursal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codSucursal: factura.codSucursal,
            nomSucursal: factura.NomSucursal
          })
        });

        const data = await response.json();

        if (response.ok && data) {
          setSucursal(data);
        } else {
          console.error("No se pudo obtener la información de la sucursal");
        }
      } catch (error) {
        console.error("Error al obtener la sucursal:", error);
      }
    };

    obtenerSucursal();
  }, [factura]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormDataLocal(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "CodSucursal") {
    buscarSucursalPorCodigo(value);
  }

  setFormDataLocal(prev => ({
    ...prev,
    [name]: value
  }));
};


  const renderInput = (label, name, value = '') => (
    <div className="nuevo-despacho-group">
      <label><strong>{label}:</strong></label>
      <input
        type="text"
        name={name}
        value={formDataLocal[name] || value}
        onChange={handleChange}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Cliente':
        return (
          <div className="nuevo-despacho-columns">
            <div className="nuevo-despacho-left">
              {renderInput("Dirección", "Direccion")}
              {renderInput("Ciudad", "Ciudad")}
              {renderInput("Estado", "Estado")}
            </div>
            <div className="nuevo-despacho-right">
              {renderInput("País", "Pais")}
              {renderInput("Teléfono 1", "Telefono1")}
              {renderInput("Teléfono 2", "Telefono2")}
            </div>
          </div>
        );

      case 'Sucursal':
        if (!sucursal) return <p>No hay información de sucursal disponible.</p>;
        return (
          <div className="nuevo-despacho-columns">
            <div className="nuevo-despacho-left">
            {renderInput("Código Sucursal", "CodSucursal", sucursal.CodSucursal)}
            {renderInput("Nombre Sucursal", "NomSucursal", sucursal?.NomSucursal)}
              {renderInput("Dirección", "DireccionS", sucursal.Direccion)}
              {renderInput("Ciudad", "CiudadS", sucursal.Ciudad)}
              {renderInput("Estado", "EstadoS", sucursal.Estado)}
            </div>
            <div className="nuevo-despacho-right">
              {renderInput("País", "PaisS", sucursal.Pais)}
              {renderInput("Teléfono 1", "Telefono1S", sucursal.Telefono1)}
              {renderInput("Teléfono 2", "Telefono2S", sucursal.Telefono2)}
            </div>
          </div>
        );

      case 'Otro':
      default:
        return (
          <div className="nuevo-despacho-columns">
            <div className="nuevo-despacho-left">
              {renderInput("Dirección", "DireccionD")}
              {renderInput("Ciudad", "CiudadD")}
              {renderInput("Estado", "EstadoD")}
            </div>
            <div className="nuevo-despacho-right">
              {renderInput("País", "PaisD")}
              {renderInput("Teléfono 1", "Telefono1D")}
              {renderInput("Teléfono 2", "Telefono2D")}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="nuevo-despacho-info">
      <div><h3 className='nuevo-despacho-titulo'>Información de Despacho</h3></div>

      <div className="nuevo-despacho-tabs">
        <button className={activeTab === 'Cliente' ? 'activo' : ''} onClick={() => setActiveTab('Cliente')}>
          Cliente
        </button>
        <button className={activeTab === 'Sucursal' ? 'activo' : ''} onClick={() => setActiveTab('Sucursal')}>
          Sucursal
        </button>
        <button className={activeTab === 'Otro' ? 'activo' : ''} onClick={() => setActiveTab('Otro')}>
          Otro
        </button>
      </div>

      <div className="nuevo-despacho-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default NuevoInfoDespacho;


