const { poolPromise } = require('../../configs/database.js');

const obtenerListaPrecios = async (codListaPrecios) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('CodListaPrecios', codListaPrecios)
        .query(`
            SELECT
                IdListaPrecios,
                CodListaPrecios,
                NomListaPrecios
            FROM SIGD.dbo.TblListaPrecios
            WHERE CodListaPrecios = @CodListaPrecios;
        `);
    return result.recordset;
}

module.exports = {
    obtenerListaPrecios
};
