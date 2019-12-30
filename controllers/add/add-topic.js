const Account = require('../../models/account')
const Topic = require('../../models/topic')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

module.exports.signUp_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedToken = jwt.verify(token, 'greenwich')
        res.render('add-topic')
    } else {
        res.redirect('/')
    }
}

module.exports.signUp_query =
    (req, res) => {
        let { title, description } = req.body
        Topic.create(
            { title: title, description: description }
        )
            .then(result => {
                res.render('add-topic', {
                    result: 'Success'
                })
            })
            .catch(err => {
                console.log('Generate accout: ' + err)
                res.render('add-topic', {
                    result: '*Fail'
                })
            })
    }
