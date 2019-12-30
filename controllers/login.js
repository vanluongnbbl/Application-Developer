const jwt = require('jsonwebtoken')
const Account = require('../models/account')
const { check, validationResult } = require('express-validator')

module.exports.logIn_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        res.redirect('/')
    } else {
        res.render('login')
    }
}

module.exports.logIn_query = [
    check('username').isLength({ min: 4, max: 20 }).escape(),
    check('password').isLength({ min: 4, max: 20 }).escape(),
    (req, res) => {
        let { username, password } = req.body
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('login', {
                result: '*Wrong input format'
            })
        } else {
            Account.findOne({
                where: {
                    username: username
                }
            })
                .then(result => {
                    if (result) {
                        if (result.password == password) {
                            let payload = {
                                account_id: result.account_id,
                                username: username,
                                role: result.role
                            }
                            let token = jwt.sign(payload, 'greenwich')
                            res.cookie('token', token)
                            res.redirect('/')
                        } else {
                            res.render('login', {
                                result: '*Wrong username or password'
                            })
                        }
                    } else {
                        res.render('login', {
                            result: '*Wrong username or password'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.render('login', {
                        result: '*Wrong username or password'
                    })
                })
        }
    }
]