const { obtenerFactura} = require('../../models/ventas/facturacion_models.js'); // Asegúrate de que la ruta sea correcta

// Controlador para obtener la informacion del formulario
// Payload que espera recibir
// {
//   "codEmpresa": "01",
//   "codSucursal": "A" 
//   "codTipoDoc": "01"
// }
const getFactura = async (req, res) => {
  const { codEmpresa, codSucursal, codTipoDoc } = req.body;

  // Validación básica
  if (!codEmpresa || typeof codEmpresa !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El campo codEmpresa es requerido y debe ser una cadena de texto.'
    });
  }

  try {
    const data = await obtenerFactura(codEmpresa);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron resultados para la empresa proporcionada.'
      });
    }

    let sucursales = data.Sucursales;

    // Si se proporciona codSucursal, filtramos la sucursal específica
    if (codSucursal && typeof codSucursal === 'string') {
      const sucursal = sucursales.find(s => s.CodSucursal === codSucursal);

      if (!sucursal) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la sucursal con código ${codSucursal} para la empresa.`
        });
      }

      // Si también se proporciona codTipoDoc, filtramos los documentos
      if (codTipoDoc && typeof codTipoDoc === 'string') {
        const documentosFiltrados = sucursal.Documentos.filter(doc => doc.CodTipoDoc === codTipoDoc);

        return res.status(200).json({
          success: true,
          data: {
            CodEmpresa: data.CodEmpresa,
            NomEmpresa: data.NomEmpresa,
            NomMoneda: data.NomMoneda,
            Simbolo: data.Simbolo,
            Sucursal: {
              CodSucursal: sucursal.CodSucursal,
              NomSucursal: sucursal.NomSucursal,
              Documentos: documentosFiltrados
            }
          }
        });
      }

      // Solo sucursal
      return res.status(200).json({
        success: true,
        data: {
          CodEmpresa: data.CodEmpresa,
          NomEmpresa: data.NomEmpresa,
          NomMoneda: data.NomMoneda,
          Simbolo: data.Simbolo,
          Sucursal: sucursal
        }
      });
    }

    // Si no se especifica codSucursal, retornar toda la información
    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error al obtener factura:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener la información.'
    });
  }
};

module.exports = { getFactura };
