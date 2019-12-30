const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const Account = require('../models/account')

const extractorJwt = (req) => {
    let token = null
    if (req && req.cookie.token) {
        token = req.cookies.token;
    }
    return token
}

passport.serializeUser((result, done) => {
    return done(null, result.username);
});

passport.deserializeUser((username, done) => {
    return done(null, username);
});

let users = {}
users.jwtFromRequest = extractorJwt
users.secretOrKey = 'greenwich'

passport.use('jwt', new JwtStrategy(users, (jwt_payload, done) => {
    Account.findOne({
        where: {
            username: jwt_payload.username,
            password: jwt_payload.password
        }
    }

    )
        .then(result => {
            if (result.length == 1) {
                return done(null, result)
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            return done(err, false)
        })
}))

module.exports = passport

