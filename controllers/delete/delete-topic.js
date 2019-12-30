const Topic = require('../../models/topic')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    let topic_id = req.params.id
    let encryptedCookies = jwt.verify(req.cookies['token'], 'greenwich')


    Topic.destroy({
        where: {
            topic_id: topic_id
        }
    })
        .then(topic => {
            Topic.findAll()
            .then(result => {
                res.render('list-topic', {
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
            Topic.findAll()
            .then(result => {
                res.render('list-topic', {
                    msg: "Danger",
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

