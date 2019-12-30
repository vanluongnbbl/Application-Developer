const Topic = require('../../models/topic')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Topic.findAll()
            .then(result => {
                res.render('list-topic', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {
                res.render('list-topic', {
                    result,
                    encryptedCookies
                })
            })
    } else {
        res.redirect('/')
    }
}