const {obtenerListaPrecios} = require('../../models/ventas/lista_precios_models.js');

// ✅ Ejemplo de payload esperado:
// {
//   "codListaPrecios": "01"
// }

const getListaPrecios = async (req, res) => {
    try {
        const {codListaPrecios} = req.body;

        // Validación del campo
        if (!codListaPrecios || typeof codListaPrecios !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'El campo codListaPrecios es requerido y debe ser una cadena de texto.'
            });
        }
        const data = await obtenerListaPrecios(codListaPrecios);
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró ninguna lista de precios con el código proporcionado.'
            });
        }
        res.json(data);
    }
    catch (error) {
        console.error('❌ Error al obtener tipo de persona:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener la lista de precios.'
        });
    }
}

module.exports = { getListaPrecios };


