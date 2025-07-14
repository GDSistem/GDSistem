import React, { useState } from 'react';
import '../Styles/NuevoTablaProductos.css';

function NuevoTablaProductos() {
//   const [filas, setFilas] = useState([{ item: 0, CodProducto: '', NomProducto: '', Espesor: '', Peso: '' }]);
const [filas, setFilas] = useState([{ 
    item: 0, CodProducto: '', NomProducto: '', Peso: '', CodSubProducto: '', Subproducto: '', Lista: '', Cantidad: '', CantidadDisponible: '', LAncho: '', Ancho: '', LAlto: '', Alto: '', Largo: '', TotalMedida: '', Precio: '', Descuento: '', DsctoAdicional: '', Desperdicio: '', Riesgo: '', TotalBase: '', TasaIva: '', TotalIva: '', Forma: '', OrdenCompra: '', TotalPeso: '', Redondea5: '', TipoIva: '', TipoPatente: '', TasaPatente: '', TotalPatente: '', CodUnidadMedida: '', IdTipoProducto: '',
  }]);
  const [showModal, setShowModal] = useState(false);
  const [codigoInvalido, setCodigoInvalido] = useState('');
   const [modalEliminar, setModalEliminar] = useState(null); // índice a eliminar o null

//   const agregarFila = () => {
//     setFilas([...filas, { item: filas.length, CodProducto: '', NomProducto: '', Espesor: '', Peso: '' }]);
//   };

const agregarFila = () => {
    setFilas([...filas, {
      item: filas.length, CodProducto: '', NomProducto: '', Peso: '', CodSubProducto: '', Subproducto: '', Lista: '', Cantidad: '', CantidadDisponible: '', LAncho: '', Ancho: '', LAlto: '', Alto: '', Largo: '', TotalMedida: '', Precio: '', Descuento: '', DsctoAdicional: '', Desperdicio: '', Riesgo: '', TotalBase: '', TasaIva: '', TotalIva: '', Forma: '', OrdenCompra: '', TotalPeso: '', Redondea5: '', TipoIva: '', TipoPatente: '', TasaPatente: '', TotalPatente: '', CodUnidadMedida: '', IdTipoProducto: '',
    }]);
  };

  const handleCheckboxChange = (e, index, campo) => {
  const nuevasFilas = [...filas];
  nuevasFilas[index][campo] = e.target.checked;
  setFilas(nuevasFilas);
};


  const handleKeyPress = async (e, index) => {
    if (e.key === 'Enter') {
      const codigo = e.target.value.trim();
      try {
        const response = await fetch('http://localhost:3000/api/ventas/factura/producto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codProducto: codigo })
        });

        if (!response.ok) throw new Error('No encontrado');
        const data = await response.json();

        if (data && data.CodProducto) {
          const nuevasFilas = [...filas];
          nuevasFilas[index] = {
            ...nuevasFilas[index],
            CodProducto: data.CodProducto,
            NomProducto: data.NomProducto,
            Espesor: data.Espesor,
            Peso: data.Peso,
            Diametro: data.Diametro,
            Dificultad: data.Dificultad,
            Desarrollo: data.Desarrollo,
            ProductoEditable: data.ProductoEditable,
            EsAjuste: data.EsAjuste,
            Comentario: data.Comentario,
            DirecDibujo: data.DirecDibujo,
            Det: data.Det,
            SubDet: data.SubDet,
            Fecha: data.Fecha,
            Usuario: data.Usuario,
            Equipo: data.Equipo,
            Dibujo: data.Dibujo,
            IdClase: data.IdClase,
            IdProducto: data.IdProducto,
            IdTipoMedida: data.IdTipoMedida,
            IdUnidadMedida: data.IdUnidadMedida,
            IdMoneda: data.IdMoneda,
            IdColor: data.IdColor,
            IdTipoProducto: data.IdTipo,
            IdUsoProducto: data.IdUsoProducto,
            CodUnidadMedida: data.CodUnidadMedida,
            Ancho: 0.00,
            Alto: 0.00,
            Largo: 0.00,
            TotalMedida: 0.00,
            Precio: 0.00,
            Descuento: 0.00,
            DsctoAdicional: 0.00,
            Desperdicio: 0.00,
            Riesgo: 0.00,
            TotalBase: 0.00,
            TasaIva: 0.00,
            TotalIva: 0.00,
            TotalPeso: 0.00,
            TasaPatente: 0.00,
            TotalPatente: 0.00,
            Lista: "01",
            SNAlto: data.SNAlto,
            SNAncho: data.SNAncho,
            SNLargo: data.SNLargo,
            SNLados: data.SNLados,
        

          };
          setFilas(nuevasFilas);
        } else {
          throw new Error('Código no válido');
        }
      } catch (error) {
        setCodigoInvalido(codigo);
        setShowModal(true);
      }
    }
  };


  const handleSubProductoKeyPress = async (e, index) => {
    if (e.key === 'Enter') {
      const codigo = e.target.value.trim();
      try {
        const response = await fetch('http://localhost:3000/api/ventas/factura/SubProducto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codSubProducto: codigo })
        });

        if (!response.ok) throw new Error('No encontrado');
        const data = await response.json();

        const filaActual = filas[index];
        if (filaActual.IdTipoProducto !== data.IdTipo) {
          throw new Error('Tipo de producto y subproducto no coinciden');
        }

        const nuevasFilas = [...filas];
        nuevasFilas[index] = {
          ...nuevasFilas[index],
          CodSubProducto: data.CodSubProducto,
          Subproducto: data.NomSubProducto,
          CantidadDisponible: 1,
          Ancho: data.Ancho,
          Alto: data.Alto,
          Largo: data.Largo,
          Desperdicio: data.Desperdicio,
          TasaIva: data.IdTipoIva,
          Redondea5: data.Redondea5,
          TipoIva: data.CodTipoIva,
          TipoPatente: data.CodTipoPatente,
          TasaPatente: data.TasaPatente,
          SNAlto: data.SNAlto,
          SNAncho: data.SNAncho,
          SNLargo: data.SNLargo,
          SNLados: data.SNLados,
        };
        setFilas(nuevasFilas);
      } catch (error) {
        setCodigoInvalido(codigo);
        setShowModal(true);
      }
    }
  };

  const handleInputChange = (e, index, campo) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index][campo] = e.target.value;
    setFilas(nuevasFilas);
  };
  const handleEliminarFila = (index) => {
    const fila = filas[index];
    const camposVacios = Object.values(fila).every(v => v === '' || v === 0 || v === fila.item);
    if (camposVacios) {
      const nuevasFilas = filas.filter((_, i) => i !== index);
      setFilas(nuevasFilas);
    } else {
      setModalEliminar(index);
    }
  };

  const confirmarEliminar = () => {
    const nuevasFilas = filas.filter((_, i) => i !== modalEliminar);
    setFilas(nuevasFilas);
    setModalEliminar(null);
  };

  return (
    <div className="tabla-productos-container">
      <h3 className="titulo-tabla">Productos</h3>
      <div className="tabla-scroll">
      <table className="tabla-productos">
        <thead>
          <tr>
            {/* <th>Item</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Espesor</th>
            <th>Peso</th> */}
            <th></th>
            <th>Item</th>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Cod Subproducto</th>
            <th>Subproducto</th>
            <th>Lista</th>
            <th>Cantidad</th>
            <th>Cantidad Disponible</th>
            <th>Unidad M</th>
            <th>Ancho</th>
            <th>Alto</th>
            <th>Largo</th>
            <th>Total Medida</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Dscto Adicional</th>
            <th>Desperdicio</th>
            <th>Riesgo</th>
            <th>Total Base</th>
            <th>Tasa Iva</th>
            <th>Total Iva</th>
            <th>Forma</th>
            <th>Orden Compra</th>
            <th>Peso</th>
            <th>Total Peso</th>
            <th>Redondea5</th>
            <th>Tipo Iva</th>
            <th>Tipo Patente</th>
            <th>Tasa Patente</th>
            <th>Total Patente</th>
            
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, index) => (
            <tr key={index}>
              <td><button className="btn-eliminar" onClick={() => handleEliminarFila(index)}>Eliminar</button></td>
              <td>{fila.item}</td>
              <td>
                <input
                  type="text"
                  value={fila.CodProducto}
                  onChange={(e) => handleInputChange(e, index, 'CodProducto')}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                />
              </td>
              
              <td><input type="text" value={fila.NomProducto} onChange={(e) => handleInputChange(e, index, 'NomProducto')} /></td>
              <td>
                <input 
                type="text" 
                value={fila.CodSubProducto}
                onChange={(e) => handleInputChange(e, index, 'CodSubProducto')} 
                onKeyDown={(e) => handleSubProductoKeyPress(e, index)}
                />
                </td>
              <td><input type="text" value={fila.Subproducto} onChange={(e) => handleInputChange(e, index, 'Subproducto')} /></td>
              <td><input type="text" value={fila.Lista} onChange={(e) => handleInputChange(e, index, 'Lista')} /></td>
              <td><input type="text" value={fila.Cantidad} onChange={(e) => handleInputChange(e, index, 'Cantidad')} /></td>
              <td><input type="text" value={fila.CantidadDisponible} onChange={(e) => handleInputChange(e, index, 'CantidadDisponible')} /></td>
              <td><input type="text" value={fila.CodUnidadMedida} onChange={(e) => handleInputChange(e, index, 'CodUnidadMedida')} /></td>
              <td><input type="text" value={fila.Ancho} onChange={(e) => handleInputChange(e, index, 'Ancho')} /></td>
              <td><input type="text" value={fila.Alto} onChange={(e) => handleInputChange(e, index, 'Alto')} /></td>
              <td><input type="text" value={fila.Largo} onChange={(e) => handleInputChange(e, index, 'Largo')} /></td>
              <td><input type="text" value={fila.TotalMedida} onChange={(e) => handleInputChange(e, index, 'TotalMedida')} /></td>
              <td><input type="text" value={fila.Precio} onChange={(e) => handleInputChange(e, index, 'Precio')} /></td>
              <td><input type="text" value={fila.Descuento} onChange={(e) => handleInputChange(e, index, 'Descuento')} /></td>
              <td><input type="text" value={fila.DsctoAdicional} onChange={(e) => handleInputChange(e, index, 'DsctoAdicional')} /></td>
              <td><input type="text" value={fila.Desperdicio} onChange={(e) => handleInputChange(e, index, 'Desperdicio')} /></td>
              <td><input type="text" value={fila.Riesgo} onChange={(e) => handleInputChange(e, index, 'Riesgo')} /></td>
              <td><input type="text" value={fila.TotalBase} onChange={(e) => handleInputChange(e, index, 'TotalBase')} /></td>
              <td><input type="text" value={fila.TasaIva} onChange={(e) => handleInputChange(e, index, 'TasaIva')} /></td>
              <td><input type="text" value={fila.TotalIva} onChange={(e) => handleInputChange(e, index, 'TotalIva')} /></td>
              <td><input type="text" value={fila.Forma} onChange={(e) => handleInputChange(e, index, 'Forma')} /></td>
              <td><input type="text" value={fila.OrdenCompra} onChange={(e) => handleInputChange(e, index, 'OrdenCompra')} /></td>
              <td><input type="text" value={fila.Peso} onChange={(e) => handleInputChange(e, index, 'Peso')} /></td>
              <td><input type="text" value={fila.TotalPeso} onChange={(e) => handleInputChange(e, index, 'TotalPeso')} /></td>
              {/* <td><input type="text" value={fila.Redondea5} onChange={(e) => handleInputChange(e, index, 'Redondea5')} /></td> */}
              <td>
                <input
                    type="checkbox"
                    checked={!!fila.Redondea5}
                    onChange={(e) => handleCheckboxChange(e, index, 'Redondea5')}
                />
                </td>

              <td><input type="text" value={fila.TipoIva} onChange={(e) => handleInputChange(e, index, 'TipoIva')} /></td>
              <td><input type="text" value={fila.TipoPatente} onChange={(e) => handleInputChange(e, index, 'TipoPatente')} /></td>
              <td><input type="text" value={fila.TasaPatente} onChange={(e) => handleInputChange(e, index, 'TasaPatente')} /></td>
              <td><input type="text" value={fila.TotalPatente} onChange={(e) => handleInputChange(e, index, 'TotalPatente')} /></td>
              {/* <td><button className="btn-eliminar" onClick={() => handleEliminarFila(index)}>Eliminar</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button className="btn-agregar" onClick={agregarFila}>Agregar Fila</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>El código <strong>{codigoInvalido}</strong> no existe.</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {modalEliminar !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              ¿Está seguro que desea eliminar la fila <strong>#{filas[modalEliminar].item}</strong> con producto <strong>{filas[modalEliminar].NomProducto}</strong>?
            </p>
            <button onClick={confirmarEliminar}>Sí, eliminar</button>
            <button onClick={() => setModalEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NuevoTablaProductos;



