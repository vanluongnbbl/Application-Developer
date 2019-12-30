const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Trainee = require('../models/trainee')
const Coach = require('../models/coach')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        if(encryptedCookies.role == 1) {
            Admin.findAll({
            where: {
                account_id: encryptedCookies.account_id
            }
        })
            .then(admin => {
                res.render('index', {
                    result: encryptedCookies,
                    admin: admin
                })
            })
            .catch(err => {
                res.render('index', {
                    result: encryptedCookies
                })
            })
        } else if (encryptedCookies.role == 3) {
            Trainee.findAll({
                where: {
                    account_id: encryptedCookies.account_id
                }
            })
                .then(trainee => {
                    res.render('index', {
                        result: encryptedCookies,
                        trainee: trainee
                    })
                })
                .catch(err => {
                    res.render('index', {
                        result: encryptedCookies
                    })
                })
                
        } else if (encryptedCookies.role == 2) {
            Coach.findAll({
                where: {
                    account_id: encryptedCookies.account_id
                }
            })
                .then(coach => {
                    res.render('index', {
                        result: encryptedCookies,
                        coach: coach
                    })
                })
                .catch(err => {
                    res.render('index', {
                        result: encryptedCookies
                    })
                })
                
        } else (
            res.render('index',{
                result: encryptedCookies
            })
        )
        
    } else {
        res.render('index')
    }
}