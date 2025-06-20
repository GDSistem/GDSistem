const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerCliente = async (codCliente) => {
  try {
    console.log('🔍 Buscando cliente desde TblClientes con CodCliente:', codCliente);

    const pool = await poolPromise;

    const result = await pool.request()
      .input('CodCliente', sql.VarChar, codCliente)
      .query(`
        SELECT
          IdCliente,
          IdGrupoCliente,
          IdTipoPersona,
          IdVendedorInt,
          IdVendedorExt,
          IdListaPrecios,
          CodCliente,
          NomCliente,
          Rif,
          Nit,
          Direccion,
          Pais,
          Estado,
          Ciudad,
          Telefono1,
          Telefono2,
          Fax,
          Email,
          Actividad,
          Observaciones,
          DiasCredito,
          MontoCredito,
          PorcentajeContado,
          RetencionIva,
          Exportacion,
          DiasAdicionales,
          FechaCliente,
          Fecha,
          Usuario,
          Equipo
        FROM SIGD.dbo.TblClientes
        WHERE CodCliente = @CodCliente
      `);

    const cliente = result.recordset[0];

    if (!cliente) {
      console.log('⚠️ No se encontró cliente con ese código');
      return null;
    }

    console.log('✅ Cliente encontrado:', cliente);
    return cliente;

  } catch (error) {
    console.error('❌ Error al obtener cliente desde TblClientes:', error);
    throw error;
  }
};

module.exports = { obtenerCliente };
