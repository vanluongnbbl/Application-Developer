const Sequelize = require('./pg').S
const sequelize = require('./pg').s

const Topic = sequelize.define('topics', {
    topic_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, { timestamps: false })

module.exports = Topic