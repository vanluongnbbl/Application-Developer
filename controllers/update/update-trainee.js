const Trainee = require('../../models/trainee')

module.exports.get = (req, res) => {
    id = req.params.id
    Trainee.findAll({
        where: {
            trainee_id: id
        }
    })
        .then(result => {
            res.render('update-trainee', { result: result })
        })
        .catch(err => {
            res.render('notification', { msg: 'Error, please try again' })
        })
}


module.exports.post = (req, res) => {
    id = req.params.id
    Trainee.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }, {
        where: {
            trainee_id: id
        }
    })
        .then(result => {
            res.render('notification', { msg: 'Success' })
        })
        .catch(err => {
            res.render('notification', { msg: 'Update Error!!' })
        })
}
