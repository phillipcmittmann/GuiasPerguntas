const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const connection = require('./database');

const PerguntaModel = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

PerguntaModel.sync({ force: false });