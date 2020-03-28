const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

//DEVUELVE TODO EL CUERPO DE LA PETICIÓN POR POST
pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

//DEVUELVE UNA LISTA DE TODOS LOS POKEMON POR GET
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

//DEVUELVE LOS POKEMON QUE COINCIDA CON EL ID SOLICITADO
pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const result = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [req.params.id]);
  (!result.length) ? res.status(404).send("Pokemon no encontrado") : res.status(202).json(result.pop());
});

//DEVUELVE LOS POKEMON CUYO NOMBRE COINCIDA CON EL SOLICITADO
pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const result = await db.query('SELECT * FROM pokemon WHERE UPPER(pok_name) = ?', [req.params.name.toUpperCase()]);
    (!result.length) ? res.status(404).send("Pokemon no encontrado") : res.status(202).json(result.pop());
});


//--FORMA SENCILLA DE EXPORTAR UNO POR UNO
    module.exports = pokemon;

