const { obtenerDespacho } = require('../../models/ventas/despacho_models.js');

// Payload esperado:
// {
//   "codEmpresa": "01",
//   "codSucursal": "A",
//   "codTipoDoc": "NC",
//   "nDocumento": "00001"
// }

const getDespacho = async (req, res) => {
  try {
    const { codEmpresa, codSucursal, codTipoDoc, nDocumento } = req.body;

    // Validación de parámetros
    if (!codEmpresa || !codSucursal || !codTipoDoc || !nDocumento) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos: codEmpresa, codSucursal, codTipoDoc o nDocumento' });
    }

    // Llamar al modelo
    const datos = await obtenerDespacho(codEmpresa, codSucursal, codTipoDoc, nDocumento);

    // Validar respuesta
    if (datos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron registros' });
    }

    // Éxito
    return res.status(200).json(datos);
  } catch (error) {
    console.error('Error en getDespacho:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getDespacho };
