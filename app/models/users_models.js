// models/metodos.model.js
const { poolPromise } = require('../configs/database.js'); // Asegúrate de que la ruta sea correcta

// Función para obtener los métodos de cobro
const obtenerUsuarios = async () => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM dbo.TblUsuarios');
  return result.recordset; // devuelve array de objetos
};

const obtenerUsuario = async (nombre) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('CodUsuario', nombre)
    .query('SELECT * FROM dbo.TblUsuarios WHERE CodUsuario = @CodUsuario');

  return result.recordset[0]; // devuelve solo un usuario o undefined
};

  


module.exports = { obtenerUsuarios, obtenerUsuario };
