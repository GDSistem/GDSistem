const { poolPromise } = require('../configs/database.js');

const obtenerEmpresa = async (codEmpresa) => {
  const pool = await poolPromise;

  const result = await pool.request()
    .input('CodEmpresa', codEmpresa)
    .query(`
      SELECT
        e.IdEmpresa,
        e.CodEmpresa,
        e.NomEmpresa,
        s.IdSucursal,
        s.CodSucursal,
        s.NomSucursal,
        m.NomMoneda,
        m.Simbolo,
        td.CodTipoDoc,
        snd.NDocumento
      FROM dbo.TblEmpresas e
      INNER JOIN dbo.TblSucursales s ON s.IdEmpresa = e.IdEmpresa
      LEFT JOIN dbo.TblMonedas m ON e.IdMoneda = m.IdMoneda
      LEFT JOIN dbo.TblSucursalNDoc snd ON snd.IdSucursal = s.IdSucursal
      LEFT JOIN dbo.TblTipoDoc td ON td.IdTipoDoc = snd.IdTipoDoc
      WHERE e.CodEmpresa = @CodEmpresa
    `);

  const records = result.recordset;

  if (records.length === 0) return null;

  const { CodEmpresa, NomEmpresa, NomMoneda, Simbolo } = records[0];

  // Agrupar por sucursal
  const sucursalesMap = new Map();

  records.forEach(row => {
    const key = row.CodSucursal;
    if (!sucursalesMap.has(key)) {
      sucursalesMap.set(key, {
        CodSucursal: row.CodSucursal,
        NomSucursal: row.NomSucursal,
        Documentos: []
      });
    }

    if (row.CodTipoDoc && row.NDocumento) {
      sucursalesMap.get(key).Documentos.push({
        CodTipoDoc: row.CodTipoDoc,
        NDocumento: row.NDocumento
      });
    }
  });

  const Sucursales = Array.from(sucursalesMap.values());

  return {
    CodEmpresa,
    NomEmpresa,
    NomMoneda,
    Simbolo,
    Sucursales
  };
};

module.exports = { obtenerEmpresa };
