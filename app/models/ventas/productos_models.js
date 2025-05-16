const { poolPromise } = require('../../configs/database.js');

const obtenerProductos = async (codEmpresa, codSucursal, codTipoDoc, codCliente) => {
  console.log('Parámetros recibidos en obtenerProductos:');
  console.log('codEmpresa:', codEmpresa);
  console.log('codSucursal:', codSucursal);
  console.log('codTipoDoc:', codTipoDoc);
  console.log('codCliente:', codCliente);

  const pool = await poolPromise;
  const request = pool.request();

  request.input('CodEmpresa', codEmpresa);
  request.input('CodSucursal', codSucursal);
  request.input('CodTipoDoc', codTipoDoc);
  request.input('CodCliente', codCliente);

  const result = await request.query(`
    DECLARE @IdEmpresa INT;
    DECLARE @IdSucursal INT;
    DECLARE @IdTipoDoc INT;
    DECLARE @IdCliente INT;

    -- Obtener IdEmpresa
    SELECT @IdEmpresa = IdEmpresa
    FROM dbo.TblEmpresas
    WHERE CodEmpresa = @CodEmpresa;

    -- Obtener IdSucursal vinculado a la empresa
    SELECT @IdSucursal = IdSucursal
    FROM dbo.TblSucursales
    WHERE CodSucursal = @CodSucursal AND IdEmpresa = @IdEmpresa;

    -- Obtener IdTipoDoc
    SELECT @IdTipoDoc = IdTipoDoc
    FROM dbo.TblTipoDoc
    WHERE CodTipoDoc = @CodTipoDoc;

    -- Obtener IdCliente
    SELECT @IdCliente = IdCliente
    FROM dbo.TblClientes
    WHERE CodCliente = @CodCliente;

    IF @IdEmpresa IS NOT NULL AND @IdSucursal IS NOT NULL AND @IdTipoDoc IS NOT NULL AND @IdCliente IS NOT NULL
    BEGIN
      SELECT TOP 10
        td.CodTipoDoc,
        s.CodSucursal,
        e.CodEmpresa,
        v.NDocumento,
        v.IdVenta,
        c.CodCliente,
        c.NomCliente
      FROM dbo.TblVentas v
      INNER JOIN dbo.TblTipoDoc td ON td.IdTipoDoc = v.IdTipoDoc
      INNER JOIN dbo.TblSucursales s ON s.IdSucursal = v.IdSucursal
      INNER JOIN dbo.TblEmpresas e ON e.IdEmpresa = s.IdEmpresa
      LEFT JOIN dbo.TblClientes c ON c.IdCliente = v.IdCliente
      WHERE v.IdSucursal = @IdSucursal
        AND v.IdTipoDoc = @IdTipoDoc
        AND s.IdEmpresa = @IdEmpresa
        AND v.IdCliente = @IdCliente
      ORDER BY v.Fecha DESC
    END
    ELSE
    BEGIN
      SELECT NULL AS CodTipoDoc
    END
  `);

  const ventas = result.recordset.filter(row => row.CodTipoDoc !== null);

  if (ventas.length === 0) return [];

  const detallesPorVenta = {};
  for (const venta of ventas) {
    const detalleRequest = pool.request();
    detalleRequest.input('IdVenta', venta.IdVenta);

    const detalleResult = await detalleRequest.query(`
      SELECT
        d.IdVentaDet,
        d.NomProducto,
        d.NomSubProducto,
        d.Cantidad,
        d.Precio,
        d.Alto,
        d.Ancho,
        d.Largo,
        d.TasaIva,
        d.TotalBase,
        d.TotalIva,
        d.DescuentoA,
        d.TasaPatente
      FROM dbo.TblVentasDet d
      WHERE d.IdVenta = @IdVenta
    `);

    detallesPorVenta[venta.IdVenta] = detalleResult.recordset;
  }

  const resultadoFinal = ventas.map(v => {
    const { IdVenta, ...restoVenta } = v;
    return {
      ...restoVenta,
      Detalles: detallesPorVenta[IdVenta] || []
    };
  });

  return resultadoFinal;
};

module.exports = { obtenerProductos };
