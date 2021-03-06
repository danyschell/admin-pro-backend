require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

// Configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

//dir publico
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


// si no entra en ninguna ruta de arriba...
app.get('*', (req, res) => {
    res.sendFile(path.resolve( __dirname, 'public/index.html'));
});

//levantar servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
