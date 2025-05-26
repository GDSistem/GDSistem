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

    -- Paso 1: Obtener IdEmpresa
    SELECT @IdEmpresa = IdEmpresa
    FROM dbo.TblEmpresas
    WHERE CodEmpresa = @CodEmpresa;

    -- Paso 2: Obtener IdSucursal usando IdEmpresa y CodSucursal
    SELECT @IdSucursal = IdSucursal
    FROM dbo.TblSucursales
    WHERE CodSucursal = @CodSucursal AND IdEmpresa = @IdEmpresa;

    -- Paso 3: Obtener IdTipoDoc
    SELECT @IdTipoDoc = IdTipoDoc
    FROM dbo.TblTipoDoc
    WHERE CodTipoDoc = @CodTipoDoc;

    -- Paso 4: Buscar en TblNEVentas usando IdSucursal, IdTipoDoc y NDocumento
    IF @IdSucursal IS NOT NULL AND @IdTipoDoc IS NOT NULL
    BEGIN
      SELECT ne.*
      FROM dbo.TblNEVentas ne
      WHERE ne.IdSucursal = @IdSucursal
        AND ne.IdTipoDoc = @IdTipoDoc
        AND ne.NDocumento = @NDocumento;
    END
    ELSE
    BEGIN
      SELECT NULL AS IdVenta;
    END
  `);

  // Filtra resultados válidos
  return result.recordset.filter(row => row.IdVenta !== null);
};

module.exports = { obtenerDespacho };
