const { obtenerTipoPersonas } = require('../../models/ventas/tipo_personas_models.js'); // Ruta correcta

// ✅ Ejemplo de payload esperado:
// {
//   "codTipoPersona": "N"
// }

const getTipoPersonas = async (req, res) => {
    
  const { codTipoPersona } = req.body;


  // Validación del campo
  if (!codTipoPersona || typeof codTipoPersona !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codTipoPersona es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const data = await obtenerTipoPersonas(codTipoPersona);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró ningún tipo de persona con el código proporcionado.'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('❌ Error al obtener tipo de persona:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el tipo de persona.'
    });
  }
};

module.exports = { getTipoPersonas };
