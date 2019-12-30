const sequelize = require('./pg').s
const Sequelize = require('./pg').S
const Account = require('./account')

const Trainee = sequelize.define('trainees', {
    trainee_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_id: {
        type: Sequelize.INTEGER,
        references: Account,
        referencesKey: 'account_id'
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
}, { timestamps: false })

Trainee.belongsTo(Account, {
    as: 'accounts',
    foreignKey: 'account_id'
})

module.exports = Trainee