const {obtenerCliente} = require('../models/clientes_models'); // Asegúrate de que la ruta sea correcta

// Controlador para obtener la empresa y sus sucursales
// Payload que espera recibir
// {
//   "codDocumento": "documento"
// }
const getCliente = async (req, res) => {
    const { codDocumento } = req.body;
  
    // Validación básica
    if (!codDocumento || typeof codDocumento !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'El campo codDocumento es requerido y debe ser una cadena de texto.'
      });
    }
  
    try {
      const data = await obtenerCliente(codDocumento);
  
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