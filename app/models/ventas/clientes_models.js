const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerCliente = async (nDocumento) => {
  try {
    console.log('🔍 Buscando cliente con NDocumento:', nDocumento);

    const pool = await poolPromise;

    const result = await pool.request()
      .input('nDocumento', sql.VarChar, nDocumento)
      .query(`
        DECLARE @IdSucursal INT, @IdCliente INT, @IdVendedorInt INT;

        -- Obtener datos desde TblVentas por NDocumento
        SELECT TOP 1 
          @IdSucursal = IdSucursal,
          @IdCliente = IdCliente,
          @IdVendedorInt = IdVendedorInt
        FROM dbo.TblVentas
        WHERE NDocumento = @nDocumento;

        -- Retornar datos del cliente y vendedor
        SELECT 
          c.*,
          v.CodVendedor,
          v.NomVendedor
        FROM dbo.TblClientes c
        LEFT JOIN dbo.TblVendedores v ON @IdVendedorInt = v.IdVendedor
        WHERE c.IdCliente = @IdCliente;
      `);

    const records = result.recordset;
    console.log('📄 Registros encontrados:', records.length);

    if (records.length === 0) {
      console.log('⚠️ No se encontró ningún cliente para ese NDocumento');
      return null;
    }

    console.log('✅ Cliente encontrado:', records[0]);
    return records[0];
  } catch (error) {
    console.error('❌ Error al obtener cliente:', error);
    throw error;
  }
};

module.exports = { obtenerCliente };
