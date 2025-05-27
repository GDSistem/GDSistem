const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerCliente = async (nDocumento) => {
  try {
    console.log('🔍 Buscando datos desde TblVentas con NDocumento:', nDocumento);

    const pool = await poolPromise;

    const result = await pool.request()
      .input('nDocumento', sql.VarChar, nDocumento)
      .query(`
        -- Obtener todos los datos desde TblVentas junto con el vendedor, tipo de persona, lista de precios y cliente
        SELECT 
          v.*,
          ven.CodVendedor,
          ven.NomVendedor,
          tp.CodTipoPersona,
          tp.NomTipoPersona,
          lp.CodListaPrecios,
          lp.NomListaPrecios,
          c.DiasAdicionales
        FROM dbo.TblVentas v
        LEFT JOIN dbo.TblVendedores ven ON v.IdVendedorInt = ven.IdVendedor
        LEFT JOIN dbo.TblTipoPersonas tp ON v.IdTipoPersona = tp.IdTipoPersona
        LEFT JOIN dbo.TblVentasDet vd ON vd.IdVenta = v.IdVenta
        LEFT JOIN dbo.TblListaPrecios lp ON vd.IdListaPrecios = lp.IdListaPrecios
        LEFT JOIN dbo.TblClientes c ON v.IdCliente = c.IdCliente
        WHERE v.NDocumento = @nDocumento;
      `);

    const records = result.recordset;
    console.log('📄 Registros encontrados:', records.length);

    if (records.length === 0) {
      console.log('⚠️ No se encontró ningún resultado para ese NDocumento');
      return null;
    }

    console.log('✅ Datos encontrados:', records);
    return records;
  } catch (error) {
    console.error('❌ Error al obtener datos desde TblVentas:', error);
    throw error;
  }
};

module.exports = { obtenerCliente };
