const expressJwt = require('express-jwt');
const config = require('config.json');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/user/login',
            '/user/create'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await global.services["user"].readById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    req.body['user_id'] = user.id;
    // console.log(req.body);
    done();
};