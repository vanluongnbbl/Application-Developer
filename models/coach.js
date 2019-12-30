const sequelize = require('./pg').s
const Sequelize = require('./pg').S
const Account = require('./account')

const Coach = sequelize.define('coachs', {
    coach_id: {
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

Coach.belongsTo(Account, {
    as: 'accounts',
    foreignKey: 'account_id'
})

module.exports = Coach