const Course = require('../../models/course')
const jwt = require('jsonwebtoken')

module.exports.signUp_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedToken = jwt.verify(token, 'greenwich')
        res.render('add-course')
    } else {
        res.redirect('/')
    }
}

module.exports.signUp_query =
    (req, res) => {
        let { title, description, coach_id, topic_id, trainee_id } = req.body
        Course.create(
            { title: title, description: description, coach_id: coach_id, topic_id: topic_id, trainee_id: trainee_id }
        )
            .then(result => {
                res.render('add-course', {
                    result: 'Success'
                })
            })
            .catch(err => {
                console.log('Generate account: ' + err)
                res.render('add-course', {
                    result: 'Danger'
                })
            })
    }
