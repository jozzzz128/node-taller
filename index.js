const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VERBOS
    GET - Obtener recursos
    POST - almacenar/crear recursos
    PATCH - modificar una parte de un recurso
    PUT - modificar un recurso
    DELETE - borrar un recurso
*/

/* OPERADOR TERNARIO
    condicion ? valor si verdadero : valor si falso
*/

app.get("/", (req, res, next) =>{
    return res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});