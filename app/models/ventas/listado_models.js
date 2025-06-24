const sql = require('mssql');
const { poolPromise } = require('../../configs/database.js');

const obtenerListado = async (codEmpresa, codSucursal, codTipoDoc, fechaInicio, fechaFin) => {
  console.log('Parámetros recibidos en obtenerListado:');
  console.log('codEmpresa:', codEmpresa);
  console.log('codSucursal:', codSucursal);
  console.log('codTipoDoc:', codTipoDoc);
  console.log('fechaInicio:', fechaInicio);
  console.log('fechaFin:', fechaFin);

  const pool = await poolPromise;
  const request = pool.request();

  request.input('CodEmpresa', sql.VarChar, codEmpresa);
  request.input('CodSucursal', sql.VarChar, codSucursal);
  request.input('CodTipoDoc', sql.VarChar, codTipoDoc);

  if (fechaInicio) {
    request.input('FechaInicio', sql.DateTime, fechaInicio);
  }
  if (fechaFin) {
    request.input('FechaFin', sql.DateTime, fechaFin);
  }

  const result = await request.query(`
    SELECT
      IdVenta,
      IdEmpresa,
      CodEmpresa,
      NomEmpresa,
      IdSucursal,
      CodSucursal,
      NomSucursal,
      IdTipoDoc,
      CodTipoDoc,
      NomTipoDoc,
      Naturaleza,
      NDocumento,
      NControl,
      IdCliente,
      CodCliente,
      NomCliente,
      IdGrupoCliente,
      CodGrupoCliente,
      NomGrupoCliente,
      Exportacion,
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
      EMail,
      Comentario,
      RetencionIva,
      FechaDoc,
      DiasCredito,
      FechaPromesa,
      IdVendedorInt,
      CodVendedorInt,
      NomVendedorInt,
      IdVendedorExt,
      CodVendedorExt,
      NomVendedorExt,
      DireccionD,
      PaisD,
      EstadoD,
      CiudadD,
      Telefono1D,
      Telefono2D,
      MontoBase,
      MontoIva,
      MontoTotal,
      TotalPeso,
      FechaContabilizada,
      Fecha,
      Usuario,
      Equipo,
      Nula,
      FechaNula,
      UsuarioNula,
      EquipoNula,
      ComentarioNula,
      Seguridad,
      TipoCambio,
      TipoCambioBCV,
      IGTF,
      USD,
      IdVentaAnt,
      PorcentajeIGTF,
      IGTFUS
    FROM SIGD.dbo.VwVentas
    WHERE CodEmpresa = @CodEmpresa
      AND CodSucursal = @CodSucursal
      AND CodTipoDoc = @CodTipoDoc
      AND (@FechaInicio IS NULL OR CONVERT(date, Fecha) >= CONVERT(date, @FechaInicio))
      AND (@FechaFin IS NULL OR CONVERT(date, Fecha) <= CONVERT(date, @FechaFin))
    ORDER BY Fecha DESC
  `);

  return result.recordset.map(row => ({
    ...row,
    codSucursal,
    codTipoDoc
  }));
};

module.exports = { obtenerListado };
