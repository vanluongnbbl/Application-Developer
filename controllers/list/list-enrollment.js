const Course = require('../../models/course')
const jwt = require('jsonwebtoken')
const Trainee = require('../../models/trainee')
const Enrollment = require('../../models/enrollment')

module.exports.get = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Enrollment.findAll({
            include: [{
                model: Course,
                as: 'courses',
                required: true,
                attributes: ['title']
            }, {
                model: Trainee,
                as: 'trainees',
                required: true,
                attributes: ['first_name', 'last_name']
            }]
        })
            .then(result => {
                res.render('list-enrollment', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    } else {
        res.redirect('/')
    }
}

module.exports.getById = (req, res) => {
    let courseId = req.params.id
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Enrollment.findAll({
            where: {
                course_id: courseId
            },
            include: [{
                model: Course,
                as: 'courses',
                required: true,
                attributes: ['title']
            }, {
                model: Trainee,
                as: 'trainees',
                required: true,
                attributes: ['first_name', 'last_name']
            }]
        })
            .then(result => {
                res.render('list-enrollment', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    } else {
        res.redirect('/')
    }
}