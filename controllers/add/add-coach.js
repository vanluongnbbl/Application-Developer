const Account = require('../../models/account')
const Coach = require('../../models/coach')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

module.exports.signUp_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedToken = jwt.verify(token, 'greenwich')
        res.render('add-coach')
    } else {
        res.redirect('/')
    }
}

module.exports.signUp_query =
    (req, res) => {
        let { username, password, first_name, last_name, email, phone, address } = req.body
        Account.create(
            { username: username, password: password, role: 2 }
        )
            .then(result => {
                Coach.create({
                    account_id: result.account_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    address: address
                })
                    .then(result => {
                        res.render('add-trainee', {
                            result: 'Success'
                        })
                    })
                    .catch(err => {
                        console.log('Generate student: ' + err)
                        res.render('add-trainee', {
                            result: '*Fail'
                        })
                    })
            })
            .catch(err => {
                console.log('Generate account: ' + err)
                res.render('add-trainee', {
                    result: '*Fail'
                })
            })
    }
