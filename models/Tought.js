//Criando e exportando a tabela no BD

const { DataTypes } = require("sequelize");
const db = require("../db/conn")

const User = require("./User")

const Tought = db.define("Tought", {
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})

//Informando que o usuário tem varios endereços
User.hasMany(Tought)
//Criando o relacionamento entre as tabelas
Tought.belongsTo(User)

module.exports = Tought