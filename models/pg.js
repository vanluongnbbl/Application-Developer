const Sequelize = require('sequelize')
const sequelize = new Sequelize('asm2', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports.S = Sequelize
module.exports.s = sequelize