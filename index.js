const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // Não é necessário extensão
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send(`Titulo: ${titulo} Descricao: ${descricao}`)
});

app.listen(4000, () => {
    console.log("App rodando");
});