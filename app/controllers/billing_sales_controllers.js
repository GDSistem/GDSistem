const {obtenerVentas} = require('../models/billing_sales_models.js'); // Asegúrate de que la ruta sea correcta

// Controlador para obtener todas las ventas
const getVentas = async (req, res) => {
    const { codEmpresa } = req.body;
  
    // Validación básica
    if (!codEmpresa || typeof codEmpresa !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'El campo codEmpresa es requerido y debe ser una cadena de texto.'
      });
    }
  
    try {
      const data = await obtenerVentas(codEmpresa);
  
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron resultados para la empresa proporcionada.'
        });
      }
  
      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al obtener ventas.'
      });
    }
  };
  
  





module.exports = { getVentas };