const Enrollment = require('../../models/enrollment')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let enrollmentId = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')

    Enrollment.destroy({
        where: {
            enrollment_id: enrollmentId
        }
    })
        .then(result => {
            res.render('notification', {
                msg: 'Success'
            })
        })
        .catch(err => {
            console.log(err)
            res.render('notification', {
                msg: 'Unsuccessful'
            })
        })
}