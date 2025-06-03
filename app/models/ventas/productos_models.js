const { poolPromise } = require('../../configs/database.js');

const obtenerProductos = async (idVenta, nDocumento) => {
  console.log('📥 IdVenta recibido en obtenerProductos:', idVenta);
  console.log('📥 NDocumento recibido en obtenerProductos:', nDocumento);

  const pool = await poolPromise;
  const request = pool.request();

  request.input('IdVenta', idVenta);
  request.input('NDocumento', nDocumento);

  // Query principal: productos
  const productosResult = await request.query(`
    SELECT
      IdVenta,
      IdVentaDet,
      Item,
      IdTipo,
      CodTipo,
      NomTipo,
      IdClase,
      CodClase,
      NomClase,
      IdProducto,
      CodProducto,
      NomProducto,
      IdSubProducto,
      CodSubProducto,
      NomSubProducto,
      IdTipoMedida,
      CodTipoMedida,
      NomTipoMedida,
      IdUnidadMedida,
      CodUnidadMedida,
      NomUnidadMedida,
      Cantidad,
      Precio,
      Descuento,
      Alto,
      Ancho,
      Largo,
      IdListaPrecios,
      CodListaPrecios,
      NomListaPrecios,
      Redondea5,
      IdForma,
      CodForma,
      NomForma,
      IdTipoIva,
      CodTipoIva,
      NomTipoIva,
      TasaIva,
      IdTipoPatente,
      CodTipoPatente,
      NomTipoPatente,
      TasaPatente,
      OrdenCompra,
      Fecha,
      Usuario,
      Equipo,
      ProductoEditable,
      SubProductoEditable,
      MedidaEditable,
      SNAlto,
      SNAncho,
      SNLargo,
      SNLados,
      Peso,
      TotalBase,
      TotalMedida,
      TotalPeso,
      TotalIva,
      TotalPatente,
      Pendiente,
      CodColor,
      NomColor,
      PendProducir,
      Inventario,
      CantidadDisponible,
      EsAjuste,
      IdVentaDetAnt,
      NDocumento,
      Forma,
      Proceso,
      CantidadFisica,
      FacturaBase,
      FacturaIva,
      DescuentoA,
      Desperdicio,
      Rotura
    FROM SIGD.dbo.VwVentasDet
    WHERE IdVenta = @IdVenta AND NDocumento = @NDocumento
    ORDER BY Fecha DESC;
  `);

  // Subquery: subdetalles con campos exactos
  const subdetallesResult = await request.query(`
    SELECT
      IdVenta,
      IdVentaDet,
      Item,
      IdVentaSubDet,
      IdTipo,
      CodTipo,
      NomTipo,
      IdClase,
      CodClase,
      NomClase,
      IdProducto,
      CodProducto,
      NomProducto,
      IdSubProducto,
      CodSubProducto,
      NomSubProducto,
      IdTipoMedida,
      CodTipoMedida,
      NomTipoMedida,
      IdUnidadMedida,
      CodUnidadMedida,
      NomUnidadMedida,
      Cantidad,
      Precio,
      Descuento,
      LAlto,
      Alto,
      LAncho,
      Ancho,
      Largo,
      IdListaPrecios,
      CodListaPrecios,
      NomListaPrecios,
      Redondea5,
      IdForma,
      CodForma,
      NomForma,
      IdTipoIva,
      CodTipoIva,
      NomTipoIva,
      TasaIva,
      IdTipoPatente,
      CodTipoPatente,
      NomTipoPatente,
      TasaPatente,
      OrdenCompra,
      Fecha,
      Usuario,
      Equipo,
      ProductoEditable,
      SubProductoEditable,
      MedidaEditable,
      SNAlto,
      SNAncho,
      SNLargo,
      SNLados,
      Peso,
      TotalBase,
      TotalMedida,
      TotalPeso,
      TotalIva,
      TotalPatente,
      CantidadItem,
      CantidadFisica,
      Inventario,
      CantidadDisponible,
      DescuentoA,
      Desperdicio,
      Rotura
    FROM SIGD.dbo.VwVentasSubDet
    WHERE IdVenta = @IdVenta
    ORDER BY Fecha DESC;
  `);

  return {
    productos: productosResult.recordset,
    subdetalles: subdetallesResult.recordset
  };
};

module.exports = { obtenerProductos };
