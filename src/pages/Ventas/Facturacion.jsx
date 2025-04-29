import React from 'react'

import '../../Styles/FacturacionVentas.css'


function Facturacion() {
  const [codigoEmpresa, setCodigoEmpresa] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [codigoSucursal, setCodigoSucursal] = useState('');
  const [nombreSucursal, setNombreSucursal] = useState('');
  const [sucursales, setSucursales] = useState([]);

  const handleEmpresaChange = async (e) => {
    const valor = e.target.value;
    setCodigoEmpresa(valor);
    setNombreEmpresa('');
    setCodigoSucursal('');
    setNombreSucursal('');
    setSucursales([]);

    if (valor.length > 0) {
      try {
        const response = await fetch('http://localhost:3000/api/billing/all-billing');
        const json = await response.json();

        // Comparar CodEmpresa (asumimos que el endpoint devuelve 1 empresa a la vez)
        if (json.success && json.data.CodEmpresa === valor) {
          setNombreEmpresa(json.data.NomEmpresa);
          setSucursales(json.data.Sucursales);
        }
      } catch (error) {
        console.error('Error al buscar empresa:', error);
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
      <div className='files'>
        <form>
          <div>
            <label>Código de Empresa:</label>
            <input
              type="text"
              value={codigoEmpresa}
              onChange={handleEmpresaChange}
              placeholder="Ej: 01"
            />
          </div>

          <div>
            <label>Nombre de Empresa:</label>
            <input type="text" value={nombreEmpresa} readOnly />
          </div>

          <div>
            <label>Código de Sucursal:</label>
            <input
              type="text"
              value={codigoSucursal}
              onChange={(e) => setCodigoSucursal(e.target.value)}
              onKeyDown={handleSucursalKeyDown}
              placeholder="Ej: A"
              disabled={!nombreEmpresa} // solo habilitar si ya hay empresa
            />
          </div>

          <div>
            <label>Nombre de Sucursal:</label>
            <input type="text" value={nombreSucursal} readOnly />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Facturacion



