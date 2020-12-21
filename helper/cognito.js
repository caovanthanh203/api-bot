const expressJwt = require('express-jwt');
// const config = require('config.json');
const config = require('../cognito.json');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

var pems;

module.exports = check;

// function jwt() {
// 	const secret = config.secret;
// 	return expressJwt({ secret, isRevoked }).unless({
// 		path: [
//             // public routes that don't require authentication
//             '/user/login',
//             '/user/create'
//             ]
//         });
// }

// async function isRevoked(req, payload, done) {
// 	const user = await global.services["user"].readById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//     	return done(null, true);
//     }
//     req.body['user_id'] = user.id;
//     // console.log(req.body);
//     done();
// };
// 
async function check(req, res, next) {
	console.log(config);
  	console.log('Cognito');
  	var status = await excute(req.body.access_token);
  	console.log("status " + status);
  	if (status){
  		console.log("Cognito success access_token");
  		next();
  	} else {
  		err = new Error();
  		err.name = "UnauthorizedError";
  		console.log("Cognito error access_token");
  		next(err);
  	};
}

async function excute(token) {
	console.log("excute");
	if (!pems) {
		console.log("!pems");
		pems = {};
		var keys = config.keys;
		for(var i = 0; i < keys.length; i++) {
			var key_id = keys[i].kid;
			var modulus = keys[i].n;
			var exponent = keys[i].e;
			var key_type = keys[i].kty;
			var jwk = { kty: key_type, n: modulus, e: exponent};
			var pem = jwkToPem(jwk);
			pems[key_id] = pem;
			console.log(pem);
		}
	}
	return await validateToken(pems, token);
}

async function validateToken(pems, token) {
	console.log("validateToken");
	var decodedJwt = jwt.decode(token, {complete: true});
	if (decodedJwt.payload.iss != config.iss) {
		console.log("invalid issuer");
	}
	if (!decodedJwt) {
		console.log("Not a valid JWT token");
	}
	if (decodedJwt.payload.token_use != 'access') {
		console.log("Not an access token");
	}
	var kid = decodedJwt.header.kid;
	var pem = pems[kid];
	return jwt.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
		console.log("jwt.verify");
		if(err) {
			// console.log("err");
			// return err;
			return false;
		} else {
			// console.log("success");
			// return decodedToken;
			return true;
		}
	});
};