const { obtenerFactura} = require('../../models/ventas/facturacion_models.js'); // Asegúrate de que la ruta sea correcta

// Controlador para obtener la informacion del formulario
// Payload que espera recibir
// {
//   "codEmpresa": "01",
//   "codSucursal": "A",
//   "codTipoDoc": "01"
// }
const getFactura = async (req, res) => {
  const { codEmpresa, codSucursal, codTipoDoc } = req.body;

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

    // Si codSucursal y codTipoDoc NO están definidos o están vacíos → devolver toda la empresa
    const isCodSucursalEmpty = !codSucursal || codSucursal.trim() === '';
    const isCodTipoDocEmpty = !codTipoDoc || codTipoDoc.trim() === '';

    if (isCodSucursalEmpty && isCodTipoDocEmpty) {
      return res.status(200).json({
        success: true,
        data
      });
    }

    let sucursales = data.Sucursales;

    // Si codSucursal está presente
    if (!isCodSucursalEmpty) {
      const sucursal = sucursales.find(s => s.CodSucursal === codSucursal);

      if (!sucursal) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la sucursal con código ${codSucursal} para la empresa.`
        });
      }

      let documentos = sucursal.Documentos;

      // Si también hay codTipoDoc
      if (!isCodTipoDocEmpty) {
        documentos = documentos.filter(doc => doc.CodTipoDoc === codTipoDoc);
      }

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
            Documentos: documentos
          }
        }
      });
    }

    // Si NO hay codSucursal, pero SÍ codTipoDoc
    if (!isCodTipoDocEmpty) {
      const sucursalesFiltradas = sucursales.map(sucursal => {
        const documentosFiltrados = sucursal.Documentos.filter(doc => doc.CodTipoDoc === codTipoDoc);
        return {
          CodSucursal: sucursal.CodSucursal,
          NomSucursal: sucursal.NomSucursal,
          Documentos: documentosFiltrados
        };
      });

      return res.status(200).json({
        success: true,
        data: {
          CodEmpresa: data.CodEmpresa,
          NomEmpresa: data.NomEmpresa,
          NomMoneda: data.NomMoneda,
          Simbolo: data.Simbolo,
          Sucursales: sucursalesFiltradas
        }
      });
    }

  } catch (error) {
    console.error('Error al obtener factura:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener la información.'
    });
  }
};

module.exports = { getFactura };


