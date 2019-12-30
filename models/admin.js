const sequelize = require('./pg').s
const Sequelize = require('./pg').S
const Account = require('./account')

const Admin = sequelize.define('admins', {
    admin_id: {
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
        type: Sequelize.STRING(100)
    },
    last_name: {
        type: Sequelize.STRING(100)
    },
    email: {
        type: Sequelize.STRING(100)
    },
    phone: {
        type: Sequelize.STRING(100)
    },
    address: {
        type: Sequelize.STRING(100)
    }
}, { timestamps: false })

Admin.belongsTo(Account, {
    as: 'accounts',
    foreignKey: 'account_id'
})

module.exports = Admin