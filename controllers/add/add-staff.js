const Account = require('../../models/account')
const Staff = require('../../models/staff')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

module.exports.signUp_form = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedToken = jwt.verify(token, 'greenwich')
        res.render('add-staff')
    } else {
        res.redirect('/')
    }
}

module.exports.signUp_query =
    (req, res) => {
        let { username, password, first_name, last_name, email, phone, address } = req.body
        Account.create(
            { username: username, password: password, role: 4 }
        )
            .then(result => {
                Staff.create({
                    account_id: result.account_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    address: address
                })
                    .then(result => {
                        res.render('add-staff', {
                            result: 'Success'
                        })
                    })
                    .catch(err => {
                        console.log('Generate student: ' + err)
                        res.render('add-staff', {
                            result: '*Fail'
                        })
                    })
            })
            .catch(err => {
                console.log('Generate accout: ' + err)
                res.render('add-staff', {
                    result: '*Fail'
                })
            })
    }
