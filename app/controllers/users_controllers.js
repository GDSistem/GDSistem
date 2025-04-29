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
const loginUsuario = async (req, res) => {
  const { nombre, contrasena } = req.body;

  if (!nombre || !contrasena) {
    return res.status(400).json({
      success: false,
      message: 'Faltan el nombre de usuario o la contraseña en el cuerpo de la solicitud',
    });
  }

  try {
    const data = await obtenerUsuario(nombre, contrasena);

    if (data) {
      // Aquí podrías generar un token si usas JWT (opcional)
      // const token = generarToken(data.id);

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar el usuario',
    });
  }
};


module.exports = { getUsuarios, loginUsuario };


