const Trainee = require('../../models/trainee')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let traineeId = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')

    Trainee.destroy({
        where: {
            trainee_id: traineeId
        }
    })
        .then(result => {
            Trainee.findAll()
            .then(result => {
                res.render('list-trainee', {
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
            Trainee.findAll()
            .then(result => {
                res.render('list-trainee', {
                    msg: "Delete fail!! Trainee might exist in another field",
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