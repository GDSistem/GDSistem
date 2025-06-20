const {poolPromise} = require('../../configs/database');

const obtenerVendedores = async (codVendedor) => {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('CodVendedor', codVendedor);

    const result = await request.query(`
        SELECT
            CodVendedor,
            NomVendedor
            FROM SIGD.dbo.TblVendedores
        WHERE CodVendedor = @CodVendedor;
    `);
    return result.recordset;
}

module.exports = {
    obtenerVendedores
};
