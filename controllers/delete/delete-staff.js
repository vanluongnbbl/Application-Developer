const Staff = require('../../models/staff')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let staffId = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')

    Staff.destroy({
        where: {
            staff_id: staffId
        }
    })
        .then(staff => {
            Staff.findAll()
            .then(result => {
                res.render('list-staff', {
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
            Staff.findAll()
            .then(result => {
                res.render('list-staff', {
                    msg: "Delete fail!! Staff might exist in another field",
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
