const { obtenerListado } = require('../../models/ventas/listado_models.js'); // Asegúrate de que la ruta sea correcta


//Payload que espera recibir 
// {
//   "codEmpresa": "01",
//   "codSucursal": "A",
//   "codTipoDoc": "NC",
//   "fechaInicio": "2016-01-01",  // opcional
//   "fechaFin": "2016-01-01"      // opcional
//   }
// Función para validar que una cadena sea fecha válida en formato YYYY-MM-DD
const esFechaValida = (fechaStr) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) return false;
  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return false;

  // Validar que el string original coincida con la fecha (ej. evitar 2025-02-31)
  const [year, month, day] = fechaStr.split('-').map(Number);
  return (
    fecha.getUTCFullYear() === year &&
    fecha.getUTCMonth() + 1 === month &&
    fecha.getUTCDate() === day
  );
};

const getListado = async (req, res) => {
  const { codEmpresa, codSucursal, codTipoDoc, fechaInicio, fechaFin } = req.body;

  // Validación de campos requeridos
  if (!codEmpresa || typeof codEmpresa !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codEmpresa es requerido y debe ser una cadena de texto.'
    });
  }

  if (!codSucursal || typeof codSucursal !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codSucursal es requerido y debe ser una cadena de texto.'
    });
  }

  if (!codTipoDoc || typeof codTipoDoc !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codTipoDoc es requerido y debe ser una cadena de texto.'
    });
  }

  // Validar fechas (opcional)
  let fechaDesde = null;
  let fechaHasta = null;

  if (fechaInicio && fechaFin) {
    if (!esFechaValida(fechaInicio) || !esFechaValida(fechaFin)) {
      return res.status(400).json({
        success: false,
        message: 'Las fechas deben estar en formato YYYY-MM-DD y ser fechas válidas.'
      });
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de inicio no puede ser mayor que la fecha fin.'
      });
    }
    fechaDesde = fechaInicio;
    fechaHasta = fechaFin;
  } else if (!fechaInicio && !fechaFin) {
    // No se envían fechas: usar rango amplio
    fechaDesde = '1900-01-01';
    fechaHasta = '2999-12-31';
  } else {
    // Solo una de las fechas fue enviada, es un error
    return res.status(400).json({
      success: false,
      message: 'Debe enviar ambas fechas: fechaInicio y fechaFin o ninguna.'
    });
  }

  try {
    const ventas = await obtenerListado(codEmpresa, codSucursal, codTipoDoc, fechaDesde, fechaHasta);

    if (!ventas || ventas.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron ventas para los criterios proporcionados.'
      });
    }

    return res.status(200).json({
      success: true,
      data: ventas
    });
  } catch (error) {
    console.error('Error al obtener listado:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener la información.'
    });
  }
};

module.exports = { getListado };
