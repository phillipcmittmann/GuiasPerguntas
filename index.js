const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const connection = require('./database/database');
const PerguntaModel = require('./database/PerguntaModel');
const RespostaModel = require('./database/RespostaModel');

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados.')
    })
    .catch((err) => {
        console.log(err);
    });

// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    PerguntaModel
        .findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        })
        .then(perguntas => {
            // Não é necessário extensão
            res.render("index", {
                perguntas: perguntas
            });
        });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
    })
    .then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;

    PerguntaModel.findOne({
        where: { id: id },
    })
    .then(pergunta => {
        if (pergunta != undefined) {
            RespostaModel.findAll({
                where: { perguntaId: pergunta.id },
                raw: true,
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });    
            });
        } else {
            res.redirect('/');
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    })
    .then(() => {
        res.redirect(`/pergunta/${perguntaId}`);
    });
});

app.listen(4000, () => {
    console.log("App rodando");
});