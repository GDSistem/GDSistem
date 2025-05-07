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
app.use('/api/empresa', require('./routes/company_routes.js'));
app.use('/api/documento', require('./routes/document_routes.js'));
app.use('/api/cliente', require('./routes/clients_routes.js'));


// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});




