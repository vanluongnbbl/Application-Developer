const Topic = require('../../models/topic')

module.exports.get = (req, res) => {
    id = req.params.id
    Topic.findAll({
        where: {
            topic_id: id
        }
    })
        .then(result => {
            res.render('update-topic', { result: result })
        })
        .catch(err => {
            res.render('notification', { msg: 'Error, please try again' })
        })
}


module.exports.post = (req, res) => {
    id = req.params.id
    Topic.update({
        title: req.body.title,
        description: req.body.description
    }, {
        where: {
            topic_id: id
        }
    })
        .then(result => {
            res.render('notification', { msg: 'Success' })
        })
        .catch(err => {
            res.render('notification', { msg: 'Update Error!!' })
        })
}
