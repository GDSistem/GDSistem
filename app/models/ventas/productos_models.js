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

  // Subquery: subdetalles
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

  // Consulta adicional: obtener TipoCambio
  const tasaResult = await request.query(`
    SELECT TOP 1 TipoCambio
    FROM SIGD.dbo.TblVentas
    WHERE IdVenta = @IdVenta AND NDocumento = @NDocumento
  `);

  const tasa = tasaResult.recordset[0]?.TipoCambio || null;

  return {
    productos: productosResult.recordset,
    subdetalles: subdetallesResult.recordset,
    tasa: tasa
  };
};

// Modelo para buscar la información de los productos
const obtenerProductoPorCodigo = async (codProducto) => {
  const pool = await poolPromise;
  const request = pool.request();

  request.input('CodProducto', codProducto);

  const result = await request.query(`
    SELECT
      [IdTipo],
      [CodTipo],
      [NomTipo],
      [IdClase],
      [CodClase],
      [NomClase],
      [IdProducto],
      [CodProducto],
      [NomProducto],
      [Espesor],
      [IdTipoMedida],
      [CodTipoMedida],
      [NomTipoMedida],
      [IdUnidadMedida],
      [CodUnidadMedida],
      [NomUnidadMedida],
      [Peso],
      [IdMoneda],
      [CodMoneda],
      [NomMoneda],
      [Diametro],
      [Dificultad],
      [Desarrollo],
      [IdColor],
      [CodColor],
      [NomColor],
      [IdTipoProducto],
      [CodTipoProducto],
      [NomTipoProducto],
      [IdUsoProducto],
      [CodUsoProducto],
      [NomUsoProducto],
      [ProductoEditable],
      [Comentario],
      [Det],
      [SubDet],
      [Fecha],
      [Usuario],
      [Equipo],
      [DirecDibujo],
      [SNAlto],
      [SNAncho],
      [SNLargo],
      [SNLados],
      [PermisoVender],
      [EsAjuste],
      [Dibujo]
    FROM [SIGD].[dbo].[VwProductos]
    WHERE CodProducto = @CodProducto
  `);

  return result.recordset;
};


// Modelo para buscar la información de los subproductos
const obtenerSubProductoPorCodigo = async (codSubProducto) => {
  const pool = await poolPromise;
  const request = pool.request();

  request.input('CodSubProducto', codSubProducto);

  const result = await request.query(`
    SELECT
      [IdTipo],
      [CodTipo],
      [NomTipo],
      [IdClase],
      [CodClase],
      [NomClase],
      [IdProducto],
      [CodProducto],
      [NomProducto],
      [IdSubProducto],
      [CodSubProducto],
      [NomSubProducto],
      [SubProductoEditable],
      [MedidaEditable],
      [Alto],
      [Ancho],
      [Largo],
      [Redondea5],
      [IdTipoPatente],
      [CodTipoPatente],
      [NomTipoPatente],
      [IdTipoIva],
      [CodTipoIva],
      [NomTipoIva],
      [Fecha],
      [Usuario],
      [Equipo],
      [ProductoEditable],
      [IdTipoMedida],
      [CodTipoMedida],
      [NomTipoMedida],
      [SNAlto],
      [SNAncho],
      [SNLargo],
      [SNLados],
      [IdUnidadMedida],
      [CodUnidadMedida],
      [NomUnidadMedida],
      [Peso],
      [IdMoneda],
      [CodMoneda],
      [NomMoneda],
      [TipoCambio],
      [IdTipoProducto],
      [CodTipoProducto],
      [NomTipoProducto],
      [IdUsoProducto],
      [CodUsoProducto],
      [NomUsoProducto],
      [PermisoVender],
      [Det],
      [SubDet],
      [PrecioEditable],
      [Proceso],
      [Inventario],
      [EsAjuste],
      [Desperdicio],
      [Rotura],
      [Ubicacion]
    FROM [SIGD].[dbo].[VwSubProductos]
    WHERE CodSubProducto = @CodSubProducto
  `);

  return result.recordset;
};



module.exports = { obtenerProductos, obtenerProductoPorCodigo, obtenerSubProductoPorCodigo };
