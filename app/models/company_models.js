const { poolPromise } = require('../configs/database.js'); // Asegúrate de que la ruta sea correcta

// Funcion para obtener las Ventas
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
        s.NomSucursal
      FROM dbo.TblEmpresas e
      INNER JOIN dbo.TblSucursales s ON s.IdEmpresa = e.IdEmpresa
      WHERE e.CodEmpresa = @CodEmpresa
    `);

  const records = result.recordset;

  // Si no hay registros, retornar null
  if (records.length === 0) return null;

  // Desestructuramos la información de la primera empresa
  const { CodEmpresa, NomEmpresa } = records[0];

  // Mapeamos las sucursales asociadas a esa empresa
  const sucursales = records.map(row => ({
    CodSucursal: row.CodSucursal,
    NomSucursal: row.NomSucursal
  }));

  // Devolvemos la estructura esperada
  return {
    CodEmpresa,
    NomEmpresa,
    Sucursales: sucursales
  };
};

module.exports = { obtenerEmpresa };