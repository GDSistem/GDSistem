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

  request.input('CodEmpresa', codEmpresa);
  request.input('CodSucursal', codSucursal);
  request.input('CodTipoDoc', codTipoDoc);

  if (fechaInicio) {
    request.input('FechaInicio', fechaInicio);
  }
  if (fechaFin) {
    request.input('FechaFin', fechaFin);
  }

  const result = await request.query(`
    DECLARE @IdEmpresa INT;
    DECLARE @IdSucursal INT;
    DECLARE @IdTipoDoc INT;

    SELECT @IdEmpresa = IdEmpresa FROM dbo.TblEmpresas WHERE CodEmpresa = @CodEmpresa;
    SELECT @IdSucursal = IdSucursal FROM dbo.TblSucursales WHERE CodSucursal = @CodSucursal AND IdEmpresa = @IdEmpresa;
    SELECT @IdTipoDoc = IdTipoDoc FROM dbo.TblTipoDoc WHERE CodTipoDoc = @CodTipoDoc;

    IF @IdSucursal IS NOT NULL AND @IdTipoDoc IS NOT NULL
    BEGIN
      SELECT
        IdVenta,
        IdSucursal,
        IdTipoDoc,
        IdVentaAnt,
        NDocumento,
        NControl,
        IdCliente,
        NomCliente,
        Exportacion,
        IdTipoPersona,
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
        IdVendedorExt,
        DireccionD,
        PaisD,
        EstadoD,
        CiudadD,
        Telefono1D,
        Telefono2D,
        MontoBase,
        MontoIva,
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
        TipoCambio,
        Reconversion,
        TipoCambioBCV,
        IGTF,
        USD,
        IGTFUS,
        PorcentajeIGTF
      FROM [SIGD].[dbo].[TblVentas]
      WHERE IdSucursal = @IdSucursal
        AND IdTipoDoc = @IdTipoDoc
        AND (@FechaInicio IS NULL OR CONVERT(date, Fecha) >= CONVERT(date, @FechaInicio))
        AND (@FechaFin IS NULL OR CONVERT(date, Fecha) <= CONVERT(date, @FechaFin))
      ORDER BY Fecha DESC
    END
    ELSE
    BEGIN
      SELECT NULL AS CodTipoDoc
    END
  `);

  return result.recordset
    .filter(row => row.CodTipoDoc !== null)
    .map(row => ({
      ...row,
      codSucursal,
      codTipoDoc
    }));
};

module.exports = { obtenerListado };
