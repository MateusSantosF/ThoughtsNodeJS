const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Taught = db.define('Thought',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})


module.exports = Taught;