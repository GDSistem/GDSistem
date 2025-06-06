import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SidebarSecundario.css';
import { FaUsers } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosPaper } from "react-icons/io";
import { GiCoins } from "react-icons/gi";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FaChartBar } from 'react-icons/fa';




function SidebarSecundario({ menu, closeSideSecundario, expandido}) {

  const sidebarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Click en:", event.target);
      if (expandido && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  if (typeof closeSideSecundario === 'function') {
  closeSideSecundario();
}

}
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const subMenus = {
        ventas: [
          {
            titulo: 'Ventas',
            opciones: [
                { nombre: 'Facturacion', path: '/ventas/facturacion' ,icon: <IoIosPaper />  },
                { nombre: 'Notas de Entrega', path: '/ventas/notasentrega',icon: <AiOutlineDeliveredProcedure />  },
            ]
          },
          {
            titulo: 'Cobros',
            opciones: [
              { nombre: 'Cobros', path: '/ventas/cobros', icon: <GiReceiveMoney /> },
              { nombre: 'Reintegro', path: '/ventas/reintegro' ,icon: <GiPayMoney />  },
              { nombre: 'Instrumento de Cobro', path: '/ventas/instrumentocobro' ,icon: <GiCoins />  },
            ]
          },
          {
            titulo: 'Datos',
            opciones: [
                { nombre: 'Clientes', path: '/ventas/clientes',icon: <FaUsers /> },
                { nombre: 'Vendedores', path: '/ventas/vendedores' ,icon: <MdOutlineSell />  },
            ]
          },
          {
            titulo: 'Reportes',
            opciones: [
              { nombre: 'Otros Ingresos', path: '/ventas/otrosingresos', icon: <RiStickyNoteAddLine /> },
              { nombre: 'Reportes de Datos', path: '/ventas/reportesdtos', icon: <TbReportAnalytics /> },
              { nombre: 'Cobro Reporte', path: '/ventas/cobroreporte', icon: <HiOutlineClipboardDocumentList />  },
              { nombre: 'Ventas', path: '/ventas/ventas', icon: <FaChartBar/>  },
              
            ]
          }
        ],
        produccion: [
          {
            titulo: 'Elaboración',
            opciones: [
                { nombre: 'Orden', path: '/produccion/orden'  ,icon: <IoIosPaper />  },
            ]
          },
          {
            titulo: 'Producción',
            opciones: [
              { nombre: 'Orden', path: '/produccion/ordenprodu' , icon: <GiReceiveMoney /> },
              { nombre: 'Entradas', path: '/produccion/entradas',icon: <GiPayMoney />  },
              { nombre: 'Salidas', path: '/produccion/salidas',icon: <GiCoins />  },
            ]
          }
        ],
        compras: [
          {
            titulo: 'Compras',
            opciones: [
                { nombre: 'Orden de Compras', path: '/compras/OrdenDeCompras' ,icon: <IoIosPaper />  },
                { nombre: 'Compras y Gastos', path: '/compras/ComprasGastos' ,icon: <IoIosPaper />  },
                { nombre: 'Notas de Entrega', path: '/compras/NotasEntrega',icon: <IoIosPaper />  },
            ]
          },
          {
            titulo: 'Pagos',
            opciones: [
              { nombre: 'Cancelación de Facturas', path: '/compras/CancelacionFactura', icon: <GiReceiveMoney /> },
              { nombre: 'Reintegro', path: '/compras/Reintegro' ,icon: <GiPayMoney />  },
              { nombre: 'Instrumentos de Pagos', path: '/compras/InstrumentoPago' ,icon: <GiCoins />  },
            ]
          },
          {
            titulo: 'Datos',
            opciones: [
              { nombre: 'Proveedores', path: '/compras/Proveedores', icon: <GiReceiveMoney /> },
              { nombre: 'Codigo de Egresos', path: '/compras/CodigoEgresos' ,icon: <GiPayMoney />  },
              { nombre: 'Centro de Costos', path: '/compras/CentroCostos' ,icon: <GiCoins />  },
            ]
          },
          {
            titulo: 'Reportes',
            opciones: [
              { nombre: 'Compras', path: '/compras/Compras' , icon: <GiReceiveMoney /> },
              { nombre: 'Pagos', path: '/compras/Pagos' ,icon: <GiPayMoney />  },
              { nombre: 'Reporte de Datos', path: '/compras/ReportesdeDatos',icon: <GiCoins />  },
            ]
          }
        ],
        inventario: [
          {
            titulo: 'Inventario',
            opciones: [
                { nombre: 'Translado de Mercancia', path: '/inventario/transladodeMercancia' ,icon: <IoIosPaper />  },
                { nombre: 'Recepci de Mercancia', path: '/inventario/recepcionMercancia',icon: <AiOutlineDeliveredProcedure />  },
            ]
          },
          {
            titulo: 'Productos',
            opciones: [
              { nombre: 'Tipos', path: '/inventario/tipo', icon: <GiReceiveMoney /> },
              { nombre: 'Clases', path: '/inventario/clases' ,icon: <GiPayMoney />  },
              { nombre: 'Productos', path: '/inventario/productos' ,icon: <GiCoins />  },
            ]
          },
          {
            titulo: 'Reportes',
            opciones: [
                { nombre: 'Reportes de Inventario', path: '/inventario/reportesInventario',icon: <FaUsers /> },
                { nombre: 'Reportes de Producto', path: '/inventario/reportesProductos' ,icon: <MdOutlineSell />  },
            ]
          },
          
        ],

        contabilidad: [
          {
            titulo: 'Retenciones IVA',
            opciones: [
                { nombre: 'Ventas', path: '/contabilidad/ventasIVA' ,icon: <IoIosPaper />  },
                { nombre: 'Compras', path: '/contabilidad/comprasIVA',icon: <AiOutlineDeliveredProcedure />  },
            ]
          },
          {
            titulo: 'Retenciones ISLR',
            opciones: [
              { nombre: 'Ventas', path: '/contabilidad/ventasISLR', icon: <GiReceiveMoney /> },
              { nombre: 'Compras', path: '/contabilidad/comprasISLR' ,icon: <GiPayMoney />  },
             
            ]
          },
          {
            titulo: 'Pagos',
            opciones: [
                { nombre: 'Ret. IVA', path: '/contabilidad/retIBA',icon: <FaUsers /> },
                { nombre: 'Ret. ISLR', path: '/contabilidad/retISLR' ,icon: <MdOutlineSell />  },
            ]
          },
          {
            titulo: 'Datos',
            opciones: [
                { nombre: 'Tipos IVA', path: '/contabilidad/tipoIVA',icon: <FaUsers /> },
                { nombre: 'Tipos ISLR', path: '/contabilidad/tipoISLR' ,icon: <MdOutlineSell />  },
            ]
          },
          {
            titulo: 'Reportes',
            opciones: [
                { nombre: 'Reportes Contables', path: '/contabilidad/reporteContable',icon: <FaUsers /> }
            ]
          },

          
        ],

      };


      const opciones = subMenus[menu] || [];



    
  return (

    <div ref={sidebarRef}
  className="sidebar-secundario"
  style={{ left: expandido ? '175px' : '75px' }}>
  {opciones.length > 0 ? (
    opciones.map((grupo, index) => (
      <div key={index} className="sidebar-grupo">
        <h3 className="sidebar-titulo">{grupo.titulo}</h3> {/* Aquí pones el título */}
        {grupo.opciones.map((opcion, subIndex) => (
          <div key={subIndex} className="sidebar-opcion">
            <Link to={opcion.path} className="sidebar-link" onClick={closeSideSecundario}>
              {opcion.icon && <span className="sidebar-icon">{opcion.icon}</span>}
              {opcion.nombre}
            </Link>
          </div>
        ))}
      </div>
    ))
  ) : (
    <p className="sidebar-no-opciones">No hay opciones disponibles</p>
  )}
</div>

  )
}

export default SidebarSecundario