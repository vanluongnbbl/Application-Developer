const Staff = require('../../models/staff')

module.exports.get = (req, res) => {
    id = req.params.id
    Staff.findAll({
        where: {
            staff_id: id
        }
    })
        .then(result => {
            res.render('update-staff', { result: result })
        })
        .catch(err => {
            res.render('notification', { msg: 'Error, please try again' })
        })
}


module.exports.post = (req, res) => {
    id = req.params.id
    Staff.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }, {
        where: {
            staff_id: id
        }
    })
        .then(result => {
            res.render('notification', { msg: 'Success' })
        })
        .catch(err => {
            res.render('notification', { msg: 'Update Error!!' })
        })
}
