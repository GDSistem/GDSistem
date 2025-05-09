const { poolPromise } = require('../configs/database.js'); // Asegúrate de que la ruta sea correcta

// Funcion para obtener el codDocumento
const obtenerDocumento = async (codDocumento) => {
    const pool = await poolPromise;
  
    const result = await pool.request()
      .input('CodTipoDoc', codDocumento)
      .query(`
        SELECT
          td.CodTipoDoc,
          td.NomTipoDoc,
          td.IdTipoDoc,
          snd.NDocumento
        FROM dbo.TblTipoDoc td
        LEFT JOIN dbo.TblSucursalNDoc snd ON td.IdTipoDoc = snd.IdTipoDoc
        WHERE td.CodTipoDoc = @CodTipoDoc
      `);
  
    const records = result.recordset;
  
    // Si no se encuentra ningún documento, retornar null
    if (records.length === 0) return null;
  
    // Retornar el primer documento encontrado (debería ser único)
    const { CodTipoDoc, NomTipoDoc, NDocumento } = records[0];
  
    return {
      CodTipoDoc,
      NomTipoDoc,
      NDocumento
    };
  };



  

module.exports = { obtenerDocumento };