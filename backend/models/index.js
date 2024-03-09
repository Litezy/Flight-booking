const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('flight','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully to db.'))
.catch((err) => console.log( err))

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = require('./UserModel')(sequelize, DataTypes)
db.sequelize.sync({force: false}).then(() =>{ console.log(`database tables synchronized successfuly`)})
module.exports = db