// Configuraciones

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);
app.set('json spaces',2);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');



// middlewares - funciones
app.use(morgan('dev'));
// Entender los formatos que lleguen desde formularios externos
app.use(express.urlencoded({extended: false}));
// Permitir recibir formatos json y entenderlos
app.use(express.json());



// Rutas
app.use(require('./routes/rutas'));

//static
app.use(express.static(path.join( __dirname, 'public')));


// Mensaje de error al no optener respuesta
app.use((req, res, next) =>{
    "res.status(404).send('Not fount 404');"
});


// Inicializando el servidor
app.listen(4000, () => {
    console.log(`Server on port ${app.get('port')}`)
});