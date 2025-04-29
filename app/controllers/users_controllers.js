const { obtenerUsuarios, obtenerUsuario } = require('../models/users_models.js'); // Asegúrate de exportar obtenerUsuario

// Controlador para obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const data = await obtenerUsuarios();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};


// Controlador para iniciar sesión

// Payload que espera recibir el login
// {
//   "nombre": "usuario",
//   "contrasena": "contraseña"
// }
const loginUsuario = async (req, res) => {
  const { nombre, contrasena } = req.body;

  if (!nombre || !contrasena) {
    return res.status(400).json({
      success: false,
      message: 'Faltan el nombre de usuario o la contraseña en el cuerpo de la solicitud',
    });
  }

  try {
    const usuario = await obtenerUsuario(nombre);

    // Verifica existencia y clave
    if (!usuario || usuario.Clave !== contrasena) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    // Si todo bien, responde éxito
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      usuario: {
        nombre: usuario.NomUsuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar el usuario',
    });
  }
};



module.exports = { getUsuarios, loginUsuario };


