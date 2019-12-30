const Course = require('../../models/course')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let courseId = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')

    Course.destroy({
        where: {
            course_id: courseId
        }
    })
        .then(result => {
            res.render('notification', {
                msg: 'Success'
            })
        })
        .catch(err => {
            res.render('notification', {
                msg: 'Failed!!'
            })
        })
}