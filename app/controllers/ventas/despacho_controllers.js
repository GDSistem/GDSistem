const { obtenerVentaDetalle } = require('../../models/ventas/despacho_models.js');

// Payload esperado:
// {
//   "codEmpresa": "01",
//   "codSucursal": "A",
//   "idVenta": 12345
// }

const getDespacho = async (req, res) => {
  try {
    const { codEmpresa, codSucursal, idVenta } = req.body;

    // Validación de parámetros
    if (!codEmpresa || !codSucursal || !idVenta) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: codEmpresa, codSucursal o idVenta'
      });
    }

    // Consultar en la base de datos
    const datos = await obtenerVentaDetalle(codEmpresa, codSucursal, idVenta);

    // Validar si se encontró información
    if (!datos || datos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron registros para los parámetros proporcionados' });
    }

    // Retornar la información
    return res.status(200).json(datos);
  } catch (error) {
    console.error('❌ Error en getDespacho:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getDespacho };
