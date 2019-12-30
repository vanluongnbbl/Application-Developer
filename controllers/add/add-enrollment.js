const Enrollment = require('../../models/enrollment')
const jwt = require('jsonwebtoken')

module.exports.signUp_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedToken = jwt.verify(token, 'greenwich')
        res.render('add-enrollment')
    } else {
        res.redirect('/')
    }
}

module.exports.signUp_query =
    (req, res) => {
        let { course_id, trainee_id } = req.body
        console.log(course_id + ' ' +trainee_id)
        Enrollment.create(
            { enrollment_id: null, course_id: course_id, trainee_id: trainee_id }
        )
            .then(result => {
                console.log(result)
                res.render('add-enrollment', {
                    result: 'Success'
                })
            })
            .catch(err => {
                res.render('add-enrollment', {
                    result: 'Danger',
                    msg: 'Non-existed course or trainee!! Check again'
                })
            })
    }
