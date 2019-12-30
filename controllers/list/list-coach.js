const Coach = require('../../models/coach')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Coach.findAll()
            .then(result => {
                res.render('list-coach', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(404)
            })
    } else {
        res.redirect('/')
    }
}