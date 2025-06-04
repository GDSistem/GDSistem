const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerCliente = async (codCliente) => {
  try {
    console.log('🔍 Buscando cliente desde VwClientes con CodCliente:', codCliente);

    const pool = await poolPromise;

    const result = await pool.request()
      .input('CodCliente', sql.VarChar, codCliente)
      .query(`
        SELECT
          IdCliente,
          CodCliente,
          NomCliente,
          IdGrupoCliente,
          CodGrupoCliente,
          NomGrupoCliente,
          IdTipoPersona,
          CodTipoPersona,
          NomTipoPersona,
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
          DiasAdicionales,
          MontoCredito,
          PorcentajeContado,
          IdListaPrecios,
          CodListaPrecios,
          NomListaPrecios,
          RetencionIva,
          Exportacion,
          IdVendedorInt,
          CodVendedorInt,
          NomVendedorInt,
          IdVendedorExt,
          CodVendedorExt,
          NomVendedorExt,
          FechaCliente,
          Fecha,
          Usuario,
          Equipo
        FROM SIGD.dbo.VwClientes
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
    console.error('❌ Error al obtener cliente desde VwClientes:', error);
    throw error;
  }
};

module.exports = { obtenerCliente };
