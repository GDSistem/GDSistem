import React from 'react'
import '../Styles/ResumenCalculosProducto.css'

function ResumenCalculosProducto({ productoSeleccionado, todosProductos, subdetalles, tasa }) {
    if (!productoSeleccionado) return null;
    console.log(todosProductos)
    console.log('subdetalles',todosProductos)

const subdetallesDelProducto = subdetalles.filter(sub => sub.IdVentaDet === productoSeleccionado.IdVentaDet);

//Funciones de la columna de Peso

const totalPesoSubdetalles = subdetallesDelProducto.reduce((acc, s) => acc + Number(s.TotalPeso || 0), 0);
const TotalPesoProcIndiv = Number(productoSeleccionado.TotalPeso || 0) + totalPesoSubdetalles;



const PesototalTodo = todosProductos.reduce((total, producto) => {
  const pesoProducto = Number(producto.TotalPeso || 0);

  const subdetallesProducto = subdetalles.filter(
    sub => sub.IdVentaDet === producto.IdVentaDet
  );

  const pesoSubdetalles = subdetallesProducto.reduce(
    (acc, sub) => acc + Number(sub.TotalPeso || 0),
    0
  );

  return total + pesoProducto + pesoSubdetalles;
}, 0);

//Funciones de la columna de Base
const totalBaseSubdetalles = subdetallesDelProducto.reduce((acc, s) => acc + Number(s.TotalBase || 0), 0);
const TotalBaseProcIndiv = Number(productoSeleccionado.TotalBase || 0) + totalBaseSubdetalles;

const BaseTotalTodo = todosProductos.reduce((total, producto) => {
  const baseProducto = Number(producto.TotalBase || 0);

  const subdetallesProducto = subdetalles.filter(
    sub => sub.IdVentaDet === producto.IdVentaDet
  );

  const baseSubdetalles = subdetallesProducto.reduce(
    (acc, sub) => acc + Number(sub.TotalBase || 0),
    0
  );

  return total + baseProducto + baseSubdetalles;
}, 0);


//Funciones de la columna de IVA

const totalIvaSubdetalles = subdetallesDelProducto.reduce((acc, s) => acc + Number(s.TotalIva || 0), 0);
const TotalIvaProcIndiv = Number(productoSeleccionado.TotalIva || 0) + totalIvaSubdetalles;

const IvaTotalTodo = todosProductos.reduce((total, producto) => {
  const ivaProducto = Number(producto.TotalIva || 0);

  const subdetallesProducto = subdetalles.filter(
    sub => sub.IdVentaDet === producto.IdVentaDet
  );

  const ivaSubdetalles = subdetallesProducto.reduce(
    (acc, sub) => acc + Number(sub.TotalIva || 0),
    0
  );

  return total + ivaProducto + ivaSubdetalles;
}, 0);



//Funciones de la columna de Total
const Total1 = TotalBaseProcIndiv + TotalIvaProcIndiv
const Total2 = BaseTotalTodo + IvaTotalTodo

//Funciones de la columna de $
const monto1 = Total1/tasa
const monto2 = Total2/tasa




  
//   const totalSubdetalleBase = subdetallesDelProducto.reduce((acc, s) => acc + Number(s.TotalBase || 0), 0);
  return (
    <div className="resumen-producto">
      <div className="grupo-calculo dolar">
        <h3>$</h3>

        <div className="card"><p>Total Item</p><span>{monto1.toFixed(2)}</span></div>
        <div className="card"><p>Total Documento</p><span>{monto2.toFixed(2)}</span></div>
        <div className="card"><p>Total Grado</p><span>{monto2.toFixed(2)}</span></div>
        <div className="card"><p>Base IGTF</p><span>{monto2.toFixed(2)}</span></div>
      </div>

      <div className="grupo-calculo peso">
        <h3>Peso</h3>
        <div className="card"><p></p><span>{TotalPesoProcIndiv.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{PesototalTodo.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{PesototalTodo.toFixed(2)}</span></div>
        {/* <div className="card"><p>Lista Precio</p><span>{productoSeleccionado.CodListaPrecios}</span></div> */}
      </div>

      <div className="grupo-calculo base">
        <h3>Base</h3>
        <div className="card"><p></p><span>{TotalBaseProcIndiv.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{BaseTotalTodo.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{BaseTotalTodo.toFixed(2)}</span></div>
        <div className="card"><p>IGTF</p></div>
      </div>

      <div className="grupo-calculo Iva">
        <h3>IVA</h3>
        <div className="card"><p></p><span>{TotalIvaProcIndiv.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{IvaTotalTodo.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{IvaTotalTodo.toFixed(2)}</span></div>
        <div className="card"><p></p><span>00.00</span></div>
      </div>

      <div className="grupo-calculo total">
        <h3>Total</h3>
        <div className="card"><p></p><span>{Total1.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{Total2.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{Total2.toFixed(2)}</span></div>
        <div className="card"><p></p><span>{Total2.toFixed(2)}</span></div>
      </div>
    </div>
  )
}

export default ResumenCalculosProducto