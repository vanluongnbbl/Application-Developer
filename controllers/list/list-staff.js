const Staff = require('../../models/staff')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let token = req.cookies['token']
    if (token) {
        let encryptedCookies = jwt.verify(token, 'greenwich')
        Staff.findAll()
            .then(result => {
                res.render('list-staff', {
                    result,
                    encryptedCookies
                })
            })
            .catch(err => {

                res.send(err)
            })
    } else {
        res.redirect('/')
    }
}