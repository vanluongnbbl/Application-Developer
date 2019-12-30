const Course = require('../../models/course')

module.exports.get = (req, res) => {
    id = req.params.id
    Course.findAll({
        where: {
            course_id: id
        }
    })
        .then(result => {
            res.render('update-course', { result: result })
        })
        .catch(err => {
            res.render('notification', { msg: 'Error, please try again' })
        })
}


module.exports.post = (req, res) => {
    id = req.params.id
    Course.update({
        title: req.body.title,
        description: req.body.description,
        coach_id: req.body.coach_id,
        topic_id: req.body.topic_id
    }, {
        where: {
            course_id: id
        }
    })
        .then(result => {
            res.render('notification', { msg: 'Success' })
        })
        .catch(err => {
            res.render('notification', { msg: 'Coach Id or Topic Id is not exist!! Please input correct information!!' })
        })
}
