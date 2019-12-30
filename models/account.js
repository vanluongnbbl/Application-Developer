const Sequelize = require('./pg').S
const sequelize = require('./pg').s

const Account = sequelize.define('accounts', {
    account_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false })

module.exports = Account