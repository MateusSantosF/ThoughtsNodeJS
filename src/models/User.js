const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Thought = require('./Thought')

const User = db.define('User',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

User.hasMany(Thought)
Thought.belongsTo(User)

module.exports = User;