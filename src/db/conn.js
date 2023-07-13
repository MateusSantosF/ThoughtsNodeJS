const {Sequelize} = require('sequelize');

const conn = new Sequelize({
    host:'localhost',
    username: 'root',
    dialect: 'mysql',
    password:'',
    database: 'thoughts'
})


conn
.authenticate()
.then(()=>{
    console.log('Conectado ao banco de dados com sucesso.')
}).catch((err)=>{
    console.log(`Erro ao conectar no banco de dados: ${err}`)
})

module.exports = conn;