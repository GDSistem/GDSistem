// models/metodos.model.js
const { poolPromise } = require('../configs/database.js'); // Asegúrate de que la ruta sea correcta

// Función para obtener los métodos de cobro
const obtenerUsuarios = async () => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM dbo.TblUsuarios');
  return result.recordset; // devuelve array de objetos
};

// Función para obtener un usuario por nombre de usuario y contraseña
const obtenerUsuario = async (nombre, contrasena) => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('NomUsuario', nombre)   // Parámetro 1
      .input('Clave', contrasena)    // Parámetro 2
      .query('SELECT * FROM dbo.TblUsuarios WHERE NomUsuario = @NomUsuario AND Clave = @Clave');
    
    return result.recordset; // Devuelve array de objetos
  };
  


module.exports = { obtenerUsuarios, obtenerUsuario };
