const express = require('express');
const app = express();

// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    // Não é necessário extensão
    // res.render("index.ejs");
    // res.render("home.ejs");
    res.render("principal/perfil.ejs");
});

app.listen(4000, () => {
    console.log("App rodando");
});