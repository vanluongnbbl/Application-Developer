const sequelize = require('./pg').s
const Sequelize = require('./pg').S
const Course = require('./course')
const Trainee = require('./trainee')

const Enrollment = sequelize.define('enrollments', {
    enrollment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_id: {
        type: Sequelize.INTEGER,
        references: Course,
        referencesKey: 'course_id'
    },
    trainee_id: {
        type: Sequelize.INTEGER,
        references: Trainee,
        referencesKey: 'trainee_id'
    }
}, { timestamps: false })

Enrollment.belongsTo(Course, {
    as: 'courses',
    foreignKey: 'course_id'
})

Enrollment.belongsTo(Trainee, {
    as: 'trainees',
    foreignKey: 'trainee_id'
})

module.exports = Enrollment