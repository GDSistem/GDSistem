const { poolPromise } = require('../../configs/database.js');

const obtenerTipoPersonas = async (codTipoPersona) => {
  const pool = await poolPromise;
  const request = pool.request();
  request.input('CodTipoPersona', codTipoPersona);

  const result = await request.query(`
    SELECT
      IdTipoPersona,
      CodTipoPersona,
      NomTipoPersona
    FROM SIGD.dbo.TblTipoPersonas
    WHERE CodTipoPersona = @CodTipoPersona;
  `);

  return result.recordset;
};

module.exports = {
  obtenerTipoPersonas
};
