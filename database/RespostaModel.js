const Sequelize = require('sequelize');
const connection = require('./database');

const RespostaModel = connection.define('respostas', {
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

RespostaModel.sync({ force: false });

module.exports = RespostaModel;