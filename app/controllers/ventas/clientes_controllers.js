const { obtenerCliente } = require('../../models/ventas/clientes_models'); // Asegúrate de que la ruta sea correcta

// ✅ Ejemplo de payload esperado:
// {
//   "nDocumento": "0003238"
// }

const getCliente = async (req, res) => {
  const { nDocumento } = req.body;

  if (!nDocumento || typeof nDocumento !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codDocumento es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const data = await obtenerCliente(nDocumento);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró ningún documento con el código proporcionado.'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el documento.'
    });
  }
};

module.exports = { getCliente };
