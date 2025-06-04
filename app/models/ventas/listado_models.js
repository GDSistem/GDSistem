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
        v.[IdVenta],
        v.[IdEmpresa],
        v.[CodEmpresa],
        v.[NomEmpresa],
        v.[IdSucursal],
        v.[CodSucursal],
        v.[NomSucursal],
        v.[IdTipoDoc],
        v.[CodTipoDoc],
        v.[NomTipoDoc],
        v.[Naturaleza],
        v.[NDocumento],
        v.[NControl],
        v.[IdCliente],
        v.[CodCliente],
        v.[NomCliente],
        v.[IdGrupoCliente],
        v.[CodGrupoCliente],
        v.[NomGrupoCliente],
        v.[Exportacion],
        v.[IdTipoPersona],
        v.[CodTipoPersona],
        v.[NomTipoPersona],
        v.[Rif],
        v.[Nit],
        v.[Direccion],
        v.[Pais],
        v.[Estado],
        v.[Ciudad],
        v.[Telefono1],
        v.[Telefono2],
        v.[Fax],
        v.[EMail],
        v.[Comentario],
        v.[RetencionIva],
        v.[FechaDoc],
        v.[DiasCredito],
        v.[FechaPromesa],
        v.[IdVendedorInt],
        v.[CodVendedorInt],
        v.[NomVendedorInt],
        v.[IdVendedorExt],
        v.[CodVendedorExt],
        v.[NomVendedorExt],
        v.[DireccionD],
        v.[PaisD],
        v.[EstadoD],
        v.[CiudadD],
        v.[Telefono1D],
        v.[Telefono2D],
        v.[MontoBase],
        v.[MontoIva],
        v.[MontoTotal],
        v.[TotalPeso],
        v.[FechaContabilizada],
        v.[Fecha],
        v.[Usuario],
        v.[Equipo],
        v.[Nula],
        v.[FechaNula],
        v.[UsuarioNula],
        v.[EquipoNula],
        v.[ComentarioNula],
        v.[Seguridad],
        v.[TipoCambio],
        v.[TipoCambioBCV],
        v.[IGTF],
        v.[USD],
        v.[IdVentaAnt],
        v.[PorcentajeIGTF],
        v.[IGTFUS]
      FROM [SIGD].[dbo].[VwVentas] v
      WHERE v.IdSucursal = @IdSucursal
        AND v.IdTipoDoc = @IdTipoDoc
        AND (@FechaInicio IS NULL OR CONVERT(date, v.Fecha) >= CONVERT(date, @FechaInicio))
        AND (@FechaFin IS NULL OR CONVERT(date, v.Fecha) <= CONVERT(date, @FechaFin))
      ORDER BY v.Fecha DESC
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
