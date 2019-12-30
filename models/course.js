const sequelize = require('./pg').s
const Sequelize = require('./pg').S
const Topic = require('./topic')
const Coach = require('./coach')

const Course = sequelize.define('courses', {
    course_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING
    },
    coach_id: {
        type: Sequelize.INTEGER,
        references: Coach,
        referencesKey: 'coach_id'
    },
    topic_id: {
        type: Sequelize.INTEGER,
        references: Topic,
        referencesKey: 'topic_id'
    }
}, { timestamps: false })

Course.belongsTo(Topic, {
    as: 'topics',
    foreignKey: 'topic_id'
})

Course.belongsTo(Coach, {
    as: 'coachs',
    foreignKey: 'coach_id'
})

module.exports = Course