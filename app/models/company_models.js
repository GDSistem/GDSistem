const { poolPromise } = require('../configs/database.js'); // Asegúrate de que la ruta sea correcta

// Función para obtener la empresa, sucursales y datos de la moneda
const obtenerEmpresa = async (codEmpresa) => {
  const pool = await poolPromise;

  const result = await pool.request()
    .input('CodEmpresa', codEmpresa)
    .query(`
      SELECT
        e.IdEmpresa,
        e.CodEmpresa,
        e.NomEmpresa,
        s.CodSucursal,
        s.NomSucursal,
        m.NomMoneda,
        m.Simbolo
      FROM dbo.TblEmpresas e
      INNER JOIN dbo.TblSucursales s ON s.IdEmpresa = e.IdEmpresa
      LEFT JOIN dbo.TblMonedas m ON e.IdMoneda = m.IdMoneda
      WHERE e.CodEmpresa = @CodEmpresa
    `);

  const records = result.recordset;

  // Si no hay registros, retornar null
  if (records.length === 0) return null;

  // Desestructuramos la información de la primera empresa
  const { CodEmpresa, NomEmpresa, NomMoneda, Simbolo } = records[0];

  // Mapeamos las sucursales asociadas a esa empresa
  const Sucursales = records.map(row => ({
    CodSucursal: row.CodSucursal,
    NomSucursal: row.NomSucursal
  }));

  // Devolvemos la estructura completa
  return {
    CodEmpresa,
    NomEmpresa,
    NomMoneda,
    Simbolo,
    Sucursales
  };
};

module.exports = { obtenerEmpresa };
