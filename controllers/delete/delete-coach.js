const Coach = require('../../models/coach')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let coachId = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')

    Coach.destroy({
        where: {
            coach_id: coachId
        }
    })
        .then(result => {
            Coach.findAll()
            .then(result => {
                res.render('list-coach', {
                    msg: "Success",
                    encryptedCookies: encryptedCookies,
                    result: result
                })
            })
            .catch(error => {
                console.log(error)
                res.send(err)
            })
        })
        .catch(err => {
            Coach.findAll()
            .then(result => {
                res.render('list-coach', {
                    msg: "Delete fail!! Coach might exist in another field",
                    encryptedCookies: encryptedCookies,
                    result: result
                })
            })
            .catch(error => {
                console.log(error)
                res.send(err)
            })
        })
}