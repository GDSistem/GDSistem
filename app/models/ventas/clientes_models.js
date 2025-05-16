const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerCliente = async (codDocumento) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('codDocumento', sql.VarChar, codDocumento)
      .query(`
        SELECT c.* 
        FROM dbo.TblTipoDoc td
        INNER JOIN dbo.TblSucursalNDoc snd ON td.IdTipoDoc = snd.IdTipoDoc
        INNER JOIN dbo.TblVentas v ON snd.NDocumento = v.NDocumento
        INNER JOIN dbo.TblClientes c ON v.IdCliente = c.IdCliente
        WHERE td.CodTipoDoc = @codDocumento
      `);

    const records = result.recordset;

    if (records.length === 0) return null;

    return records[0]; // retorna la info completa del cliente
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    throw error;
  }
};

module.exports = { obtenerCliente };
