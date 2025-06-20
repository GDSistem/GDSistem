const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// ✅ Configurar CORS primero
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/api/usuarios', require('./routes/users_routes.js'));


//Routes del Modulo Ventas/Facturacion
app.use('/api/ventas', require('./routes/ventas/facturacion_routes.js'));
app.use('/api/ventas', require('./routes/ventas/listado_routes.js'));
app.use('/api/ventas', require('./routes/ventas/productos_routes.js'));
app.use('/api/ventas', require('./routes/ventas/clientes_routes.js'));
app.use('/api/ventas', require('./routes/ventas/despacho_routes.js'));
app.use('/api/ventas', require('./routes/ventas/tipo_personas_routes.js'));
app.use('/api/ventas', require('./routes/ventas/lista_precios_routes.js'));
app.use('/api/ventas', require('./routes/ventas/vendedores_routes.js'));



app.use('/api/documento', require('./routes/document_routes.js'));



// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});




