const express = require('express');
const app = express();

// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;

    var exibirMsg = true;

    var produtos = [
        {
            nome: 'Doritos',
            preco: 3.14
        },
        {
            nome: 'Soda',
            preco: 5
        },
        {
            nome: 'Leite',
            preco: 2
        }
    ]

    // Não é necessário extensão
    res.render("index.ejs", {
        nome: nome,
        lang: lang,
        empresa: "Teste",
        inscritos: 8000,
        msg: exibirMsg,
        produtos: produtos
    });
    // res.render("home.ejs");
    // res.render("principal/perfil.ejs");
});

app.listen(4000, () => {
    console.log("App rodando");
});