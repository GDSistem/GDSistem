const { poolPromise } = require('../../configs/database.js');

const obtenerDespacho = async (codEmpresa, codSucursal, codTipoDoc, nDocumento) => {
  console.log('Parámetros recibidos en obtenerDespacho:');
  console.log('codEmpresa:', codEmpresa);
  console.log('codSucursal:', codSucursal);
  console.log('codTipoDoc:', codTipoDoc);
  console.log('nDocumento:', nDocumento);

  const pool = await poolPromise;
  const request = pool.request();

  // Parámetros requeridos
  request.input('CodEmpresa', codEmpresa);
  request.input('CodSucursal', codSucursal);
  request.input('CodTipoDoc', codTipoDoc);
  request.input('NDocumento', nDocumento);

  const result = await request.query(`
    DECLARE @IdEmpresa INT;
    DECLARE @IdSucursal INT;
    DECLARE @IdTipoDoc INT;
    DECLARE @IdVenta INT;

    -- 1. Obtener IdEmpresa
    SELECT @IdEmpresa = IdEmpresa
    FROM dbo.TblEmpresas
    WHERE CodEmpresa = @CodEmpresa;

    -- 2. Obtener IdSucursal
    SELECT @IdSucursal = IdSucursal
    FROM dbo.TblSucursales
    WHERE CodSucursal = @CodSucursal AND IdEmpresa = @IdEmpresa;

    -- 3. Obtener IdTipoDoc
    SELECT @IdTipoDoc = IdTipoDoc
    FROM dbo.TblTipoDoc
    WHERE CodTipoDoc = @CodTipoDoc;

    -- 4. Obtener IdVenta
    SELECT @IdVenta = v.IdVenta
    FROM dbo.TblVentas v
    WHERE v.IdSucursal = @IdSucursal
      AND v.IdTipoDoc = @IdTipoDoc
      AND v.NDocumento = @NDocumento;

    -- 5. Buscar en TblNEVentas por IdVenta y NDocumento
    IF @IdVenta IS NOT NULL
    BEGIN
      SELECT ne.*
      FROM dbo.TblNEVentas ne
      WHERE ne.IdVenta = @IdVenta
        AND ne.NDocumento = @NDocumento
    END
    ELSE
    BEGIN
      SELECT NULL AS IdVenta
    END
  `);

  return result.recordset.filter(row => row.IdVenta !== null);
};

module.exports = { obtenerDespacho };
