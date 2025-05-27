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

    -- Obtener IdEmpresa
    SELECT @IdEmpresa = IdEmpresa
    FROM dbo.TblEmpresas
    WHERE CodEmpresa = @CodEmpresa;

    -- Obtener IdSucursal con IdEmpresa y CodSucursal
    SELECT @IdSucursal = IdSucursal
    FROM dbo.TblSucursales
    WHERE CodSucursal = @CodSucursal AND IdEmpresa = @IdEmpresa;

    -- Obtener IdTipoDoc
    SELECT @IdTipoDoc = IdTipoDoc
    FROM dbo.TblTipoDoc
    WHERE CodTipoDoc = @CodTipoDoc;

    IF @IdSucursal IS NOT NULL AND @IdTipoDoc IS NOT NULL
    BEGIN
      SELECT TOP 
        v.NomCliente,
        v.Fecha,
        v.NDocumento,
        v.TipoCambioBCV,
        v.MontoBase,
        v.MontoIVA,
        v.IGTF,
        v.Nula,
        v.MontoBase + v.MontoIVA AS MontoTotal,
        c.CodCliente
      FROM dbo.TblVentas v
      LEFT JOIN dbo.TblClientes c ON c.IdCliente = v.IdCliente
      WHERE v.IdSucursal = @IdSucursal
        AND v.IdTipoDoc = @IdTipoDoc
        AND (@FechaInicio IS NULL OR CONVERT(date, v.Fecha) >= @FechaInicio)
        AND (@FechaFin IS NULL OR CONVERT(date, v.Fecha) <= @FechaFin)
    END
    ELSE
    BEGIN
      SELECT NULL AS CodTipoDoc
    END
  `);

  // Añadir codSucursal y codTipoDoc a cada fila
  return result.recordset
    .filter(row => row.CodTipoDoc !== null)
    .map(row => ({
      ...row,
      codSucursal,
      codTipoDoc
    }));
};

module.exports = { obtenerListado };
