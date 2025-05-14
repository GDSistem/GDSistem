import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Clientes from '../pages/Ventas/Clientes';
import Cobros from '../pages/Ventas/Cobros';
import CobroReporte from '../pages/Ventas/CobrosReportes';
import Facturacion from '../pages/Ventas/Facturacion';
import InstrumentoCobro from '../pages/Ventas/InstrumentoCobro';
import NotasEntrega from '../pages/Ventas/NotasEntrega';
import OtrosIngresos from '../pages/Ventas/OtrosIngresos';
import Reintegro from '../pages/Ventas/Reintegro';
import ReportesDtos from '../pages/Ventas/ReportesDatos';
import Vendedores from '../pages/Ventas/Vendedores';
import Ventas from '../pages/Ventas/Ventas';
import Entradas from '../pages/Produccion/Entradas';
import Orden from '../pages/Produccion/Orden';
import Salidas from '../pages/Produccion/Salidas';
import OrdenProdu from '../pages/Produccion/OrdenProdu';
import CancelacionFactura from "../pages/Compras/CancelacionFactura";
import CentroCostos from "../pages/Compras/CentroCostos";
import CodigoEgresos from "../pages/Compras/CodigoEgresos";
import Compras from "../pages/Compras/Compras";
import ComprasGastos from "../pages/Compras/ComprasGastos";
import InstrumentoPago from "../pages/Compras/InstrumentoPago";
import NotasEntregaa from "../pages/Compras/NotasEntrega";
import OrdenDeCompras from "../pages/Compras/OrdenDeCompras";
import Pagos from "../pages/Compras/Pagos";
import Proveedores from "../pages/Compras/Proveedores";
import Reintegroo from "../pages/Compras/Reintegro";
import ReportesdeDatos from "../pages/Compras/ReportesdeDatos";
import Inicio from '../pages/Inicio/Inicio'
import TransladoMercancia from '../pages/Inventario/TrasladoMercancia'
import RecepcionMercancia from '../pages/Inventario/RecepcionMercancia'
import Tipo from '../pages/Inventario/Tipo'
import Clases from '../pages/Inventario/Clases'
import Pructos from '../pages/Inventario/Productos'
import ReportesInventario from '../pages/Inventario/ReportesInventario';
import ReportesProductos from '../pages/Inventario/ReportesProductos';
import VentasIVA from '../pages/Contabilidad/VentasIVA';
import ComprasIVA from '../pages/Contabilidad/ComprasIVA';
import VentasISLR from '../pages/Contabilidad/VentasISLR';
import ComprasISLR from '../pages/Contabilidad/CompraISLR';
import RetIVA from '../pages/Contabilidad/RetIVA'
import RetISLR from '../pages/Contabilidad/RetISLR'
import TipoIVA from '../pages/Contabilidad/TiposIVA'
import TipoISLR from '../pages/Contabilidad/TiposISLR'
import ReportesContable from '../pages/Contabilidad/ReportesContabilidad'








function AppRoutes() {
  return (
    <Routes>

        <Route path="/" element={<Inicio />} />

        {/* Rutas de Bancos */}

        {/* Rutas de Contabilidad */}

         {/* Rutas de Inventario */}

        {/* Rutas de Nómina */}

        {/* Rutas de Parámetros */}
        
        {/* Rutas de Seguridad */}


        {/* Rutas de Ventas */}
        <Route path='/ventas/clientes' element={<Clientes/>} />
        <Route path='/ventas/cobros' element={<Cobros/>} />
        <Route path='/ventas/cobroreporte' element={<CobroReporte/>} />
        <Route path='/ventas/facturacion' element={<Facturacion/>} />
        <Route path='/ventas/instrumentocobro' element={<InstrumentoCobro/>} />
        <Route path='/ventas/notasentrega' element={<NotasEntrega/>} />
        <Route path='/ventas/otrosingresos' element={<OtrosIngresos/>} />
        <Route path='/ventas/reintegro' element={<Reintegro/>} />
        <Route path='/ventas/reportesdtos' element={<ReportesDtos/>} />
        <Route path='/ventas/vendedores' element={<Vendedores/>} />
        <Route path='/ventas/ventas' element={<Ventas/>} />
    
        {/* Rutas de Compras */}
        <Route path='/compras/CancelacionFactura' element={<CancelacionFactura/>} />
        <Route path='/compras/CentroCostos' element={<CentroCostos/>} />
        <Route path='/compras/CodigoEgresos' element={<CodigoEgresos/>} />
        <Route path='/compras/Compras' element={<Compras/>} />
        <Route path='/compras/ComprasGastos' element={<ComprasGastos/>} />
        <Route path='/compras/InstrumentoPago' element={<InstrumentoPago/>} />
        <Route path='/compras/NotasEntrega' element={<NotasEntregaa/>} />
        <Route path='/compras/OrdenDeCompras' element={<OrdenDeCompras/>} />
        <Route path='/compras/Pagos' element={<Pagos/>} />
        <Route path='/compras/Proveedores' element={<Proveedores/>} />
        <Route path='/compras/Reintegro' element={<Reintegroo/>} />
        <Route path='/compras/ReportesdeDatos' element={<ReportesdeDatos/>} />

        {/* Rutas de Producción */}
        <Route path='/produccion/entradas' element={<Entradas/>} />
        <Route path='/produccion/salidas' element={<Salidas/>} />
        <Route path='/produccion/orden' element={<Orden/>} />
        <Route path='/produccion/ordenprodu' element={<OrdenProdu/>} />

        {/* Rutas de Inventario */}
        <Route path='/inventario/transladodeMercancia' element={<TransladoMercancia/>} />
        <Route path='/inventario/recepcionMercancia' element={<RecepcionMercancia/>} />
        <Route path='/inventario/tipo' element={<Tipo/>} />
        <Route path='/inventario/clases' element={<Clases/>} />
        <Route path='/inventario/productos' element={<Pructos/>} />
        <Route path='/inventario/reportesInventario' element={<ReportesInventario/>} />
        <Route path='/inventario/reportesProductos' element={<ReportesProductos/>} />

        {/* Rutas de Contabilidad */}
        <Route path='/contabilidad/ventasIVA' element={<VentasIVA/>} />
        <Route path='/contabilidad/comprasIVA' element={<ComprasIVA/>} />
        <Route path='/contabilidad/ventasISLR' element={<VentasISLR/>} />
        <Route path='/contabilidad/comprasISLR' element={<ComprasISLR/>} />
        <Route path='/contabilidad/retIBA' element={<RetIVA/>} />
        <Route path='/contabilidad/retISLR' element={<RetISLR/>} />
        <Route path='/contabilidad/tipoIVA' element={<TipoIVA/>} />
        <Route path='/contabilidad/tipoISLR' element={<TipoISLR/>} />
        <Route path='/contabilidad/reporteContable' element={<ReportesContable/>} />



    </Routes>
  )
}

export default AppRoutes