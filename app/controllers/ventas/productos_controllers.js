const { obtenerProductos } = require('../../models/ventas/productos_models.js'); // Asegúrate de que la ruta sea correcta

// ════════════════════════════════════════════════════════════════════════════
//  Payload esperado:
//  {
//    "idVenta": 456,
//    "nDocumento": "ABC123"   // ejemplo de string para NDocumento
//  }
// ════════════════════════════════════════════════════════════════════════════

const getProductos = async (req, res) => {
  const { idVenta, nDocumento } = req.body;

  // ── Validación ───────────────────────────────────────────────────────────
  if (!idVenta || typeof idVenta !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'El campo idVenta es requerido y debe ser un número.'
    });
  }

  if (!nDocumento || typeof nDocumento !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo nDocumento es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const productos = await obtenerProductos(idVenta, nDocumento);

    if (!productos || productos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron productos para el IdVenta y NDocumento proporcionados.'
      });
    }

    return res.status(200).json({
      success: true,
      data: productos
    });
  } catch (error) {
    console.error('❌ Error en getProductos:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener los productos.'
    });
  }
};

module.exports = { getProductos };
