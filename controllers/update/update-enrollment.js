const Enrollment = require('../../models/enrollment')

module.exports.get = (req, res) => {
    id = req.params.id
    Enrollment.findAll({
        where: {
            enrollment_id: id
        }
    })
        .then(result => {
            res.render('update-enrollment', { result: result })
        })
        .catch(err => {
            res.render('notification', { msg: 'Error, please try again' })
        })
}


module.exports.post = (req, res) => {
    id = req.params.id
    console.log(req.body.course_id + '   ' + req.body.trainee_id)
    Enrollment.update({
        course_id: req.body.course_id,
        trainee_id: req.body.trainee_id
    }, {
        where: {
            enrollment_id: id
        }
    })
        .then(result => {
            res.render('notification', { msg: 'Success' })
        })
        .catch(err => {
            res.render('notification', { msg: 'Coach Id or Topic Id is not exist!! Please input correct information!!' })
        })
}
