const Course = require('../../models/course')
const jwt = require('jsonwebtoken')
const Coach = require('../../models/coach')
const Topic = require('../../models/topic')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        if (encryptedCookies.role != 2) {
            Course.findAll({
                include: [{
                    model: Coach,
                    as: 'coachs',
                    required: true,
                    attributes: ['first_name', 'last_name']
                }, {
                    model: Topic,
                    as: 'topics',
                    required: true,
                    attributes: ['title']
                }]
            })
                .then(result => {
                    console.log(result)
                    res.render('list-course', {
                        result,
                        encryptedCookies
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        } else {
            let account_id = encryptedCookies.account_id
            Coach.findOne({
                where: {
                    account_id: account_id
                }
            })
                .then(coach => {
                    Course.findAll({
                        where: {
                        coach_id: coach.dataValues.coach_id
                        },
                        include: [{
                            model: Coach,
                            as: 'coachs',
                            required: true,
                            attributes: ['first_name', 'last_name']
                        }, {
                            model: Topic,
                            as: 'topics',
                            required: true,
                            attributes: ['title']
                        }]
                    })
                        .then(result => {
                            res.render('list-course', {
                                result,
                                encryptedCookies
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.send(err)
                        })
                })
        }
    } else {
        res.redirect('/')
    }
}