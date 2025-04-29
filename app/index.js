const express = require('express');
const app = express();
const morgan = require('morgan');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/api/usuarios', require('./routes/users_routes.js'));


// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});


