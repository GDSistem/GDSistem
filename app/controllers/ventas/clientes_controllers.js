const { obtenerCliente } = require('../../models/ventas/clientes_models'); // Ruta correcta

// ✅ Ejemplo de payload esperado:
// {
//   "codCliente": "CLI0001"
// }

const getCliente = async (req, res) => {
  const { codCliente } = req.body;

  if (!codCliente || typeof codCliente !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codCliente es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const data = await obtenerCliente(codCliente);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró ningún cliente con el código proporcionado.'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('❌ Error al obtener cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el cliente.'
    });
  }
};

module.exports = { getCliente };
