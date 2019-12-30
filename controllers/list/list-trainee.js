const Trainee = require('../../models/trainee')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Trainee.findAll()
            .then(result => {
                res.render('list-trainee', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {
                res.sendStatus(404)
            })
    } else {
        res.redirect('/')
    }
} 