const { obtenerProductos } = require('../../models/ventas/productos_models.js'); // Asegúrate de que la ruta sea correcta

// ════════════════════════════════════════════════════════════════════════════
//  Payload esperado:
//  {
//    "codEmpresa": "01",
//    "codSucursal": "A",
//    "codTipoDoc": "F",
//    "codCliente": "C0001"
//  }
// ════════════════════════════════════════════════════════════════════════════

const getProductos = async (req, res) => {
  const { codEmpresa, codSucursal, codTipoDoc, codCliente } = req.body;

  /* ── Validaciones ───────────────────────────────────────────────────────── */
  if (!codEmpresa || typeof codEmpresa !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codEmpresa es requerido y debe ser una cadena.'
    });
  }

  if (!codSucursal || typeof codSucursal !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codSucursal es requerido y debe ser una cadena.'
    });
  }

  if (!codTipoDoc || typeof codTipoDoc !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codTipoDoc es requerido y debe ser una cadena.'
    });
  }

  if (!codCliente || typeof codCliente !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codCliente es requerido y debe ser una cadena.'
    });
  }
  /* ───────────────────────────────────────────────────────────────────────── */

  try {
    const ventas = await obtenerProductos(
      codEmpresa,
      codSucursal,
      codTipoDoc,
      codCliente
    );

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
    console.error('Error en getProductos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener los datos.'
    });
  }
};

module.exports = { getProductos };
