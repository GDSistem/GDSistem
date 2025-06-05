const { poolPromise } = require('../../configs/database.js');

const obtenerVentaDetalle = async (codEmpresa, codSucursal, idVenta) => {
  console.log('📥 codEmpresa recibido:', codEmpresa);
  console.log('📥 codSucursal recibido:', codSucursal);
  console.log('📥 idVenta recibido:', idVenta);

  const pool = await poolPromise;
  const request = pool.request();

  request.input('CodEmpresa', codEmpresa);
  request.input('CodSucursal', codSucursal);
  request.input('IdVenta', idVenta);

  const result = await request.query(`
    SELECT 
      [IdVenta]
      ,[IdEmpresa]
      ,[CodEmpresa]
      ,[NomEmpresa]
      ,[IdSucursal]
      ,[CodSucursal]
      ,[NomSucursal]
      ,[IdTipoDoc]
      ,[CodTipoDoc]
      ,[NomTipoDoc]
      ,[Naturaleza]
      ,[NDocumento]
      ,[NControl]
      ,[IdCliente]
      ,[CodCliente]
      ,[NomCliente]
      ,[IdGrupoCliente]
      ,[CodGrupoCliente]
      ,[NomGrupoCliente]
      ,[Exportacion]
      ,[IdTipoPersona]
      ,[CodTipoPersona]
      ,[NomTipoPersona]
      ,[Rif]
      ,[Nit]
      ,[Direccion]
      ,[Pais]
      ,[Estado]
      ,[Ciudad]
      ,[Telefono1]
      ,[Telefono2]
      ,[Fax]
      ,[EMail]
      ,[Comentario]
      ,[RetencionIva]
      ,[FechaDoc]
      ,[DiasCredito]
      ,[FechaPromesa]
      ,[IdVendedorInt]
      ,[CodVendedorInt]
      ,[NomVendedorInt]
      ,[IdVendedorExt]
      ,[CodVendedorExt]
      ,[NomVendedorExt]
      ,[DireccionD]
      ,[PaisD]
      ,[EstadoD]
      ,[CiudadD]
      ,[Telefono1D]
      ,[Telefono2D]
      ,[MontoBase]
      ,[MontoIva]
      ,[MontoTotal]
      ,[TotalPeso]
      ,[FechaContabilizada]
      ,[Fecha]
      ,[Usuario]
      ,[Equipo]
      ,[Nula]
      ,[FechaNula]
      ,[UsuarioNula]
      ,[EquipoNula]
      ,[ComentarioNula]
      ,[Seguridad]
      ,[TipoCambio]
      ,[TipoCambioBCV]
      ,[IGTF]
      ,[USD]
      ,[IdVentaAnt]
      ,[PorcentajeIGTF]
      ,[IGTFUS]
    FROM [SIGD].[dbo].[VwVentas]
    WHERE CodEmpresa = @CodEmpresa
      AND CodSucursal = @CodSucursal
      AND IdVenta = @IdVenta;
  `);

  return result.recordset;
};

//Modelo para obtener los detalles de una sucursal para el despacho
const obtenerSucursalDespacho = async (nomSucursal, codSucursal) => {
  const pool = await poolPromise;
  const request = pool.request();

  request.input('NomSucursal', nomSucursal);
  request.input('CodSucursal', codSucursal);

  const result = await request.query(`
    SELECT 
      [IdEmpresa], 
      [IdSucursal],
      [CodSucursal],
      [NomSucursal],
      [Rif],
      [Nit],
      [Direccion],
      [Pais],
      [Estado],
      [Ciudad],
      [Telefono1],
      [Telefono2],
      [Fax],
      [Email],
      [Actividad],
      [Impresora],
      [Fecha],
      [Usuario],
      [Equipo]
    FROM [SIGD].[dbo].[TblSucursales]
    WHERE CodSucursal = @CodSucursal AND NomSucursal = @NomSucursal
  `);

  return result.recordset;
};



module.exports = { obtenerVentaDetalle, obtenerSucursalDespacho };
