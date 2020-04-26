const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

//DEVUELVE TODO EL CUERPO DE LA PETICIÓN POR POST
pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience});`;

        const rows = await db.query(query);
        console.log(rows);

        (rows.affectedRows == 1) ? res.status(201).json({ code: 201, message: "Pokemon insertado correctamente" }) : res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

//DEVUELVE UNA LISTA DE TODOS LOS POKEMON POR GET
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pkmn});
});

//DEVUELVE LOS POKEMON QUE COINCIDA CON EL ID SOLICITADO
pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const result = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [req.params.id]);
  (!result.length) ? res.status(404).json({ code: 404, message: "Pokemon no encontrado" }) : res.status(200).json({ code: 200, message: result });
});

//DEVUELVE LOS POKEMON CUYO NOMBRE COINCIDA CON EL SOLICITADO
pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const result = await db.query('SELECT * FROM pokemon WHERE UPPER(pok_name) = ?', [req.params.name.toUpperCase()]);
    (!result.length) ? res.status(404).json({ code: 404, message: "Pokemon no encontrado" }) : res.status(200).json({ code: 200, message: result });
});


//--FORMA SENCILLA DE EXPORTAR UNO POR UNO
    module.exports = pokemon;

