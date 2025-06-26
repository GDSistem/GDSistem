const {obtenerVendedores} = require('../../models/ventas/vendedores_models');

// ✅ Ejemplo de payload esperado:
// {
//   "codVendedor": "VEN001"
// }

const getVendedor = async (req, res) => {
  const { codVendedor } = req.body;

  // Validación del campo
  if (!codVendedor || typeof codVendedor !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codVendedor es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const data = await obtenerVendedores(codVendedor);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró ningún vendedor con el código proporcionado.'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('❌ Error al obtener el vendedor:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el vendedor.'
    });
  }
};

module.exports = { getVendedor };
