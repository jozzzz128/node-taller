const express = require('express');
const app = express();

app.get("/", (req, res, next) =>{
    res.send("Bienvenido!!");
});

app.get("/:name", (req, res, next) =>{
    res.status(200);
    res.send("Hola "+req.params.name);
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});