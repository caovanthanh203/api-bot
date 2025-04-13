require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helper/errorHandlers');
const fs = require('fs')
const path = './db.json'
const config = require('./config.json');
const request = require('request');
const jwt = require('helper/jwt');
// const cognito = require('helper/cognito');

console.log(config);

// fs.unlink(path, (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

// const inject = require('inject');
// inject();
// const tinhController = require('tinh/controller');
// const tinhService = require('tinh/service');
// new tinhController();
// new tinhService();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var myLogger = function check(req, res, next) {
  	console.log('LOGGED')
  	err = new Error();
  	err.name = "UnauthorizedError";
  	next();
}

app.use(myLogger);
// app.use(cognito);

global.services = {};
global.daos = {};
global.models = {};

service = null;
dao = null;
model = null;
controller = null;

// app.use(jwt());

config["routes"].forEach(function(route){
	controller = require(route + '/controller');
	service = require(route + '/service');
	dao = require(route + '/dao');
	model = require(route + '/model');
	
	app.use((new controller(route)).build());

	global.services[route] = new service(route);
	global.daos[route] = new dao(route);
	global.models[route] = model;
  	console.log(route);
})

// use JWT auth to secure the api
// app.use(cognito);

// api routes
// app.use(userControllerIns.build());
// app.use(todoControllerIns.build());
// app.use(taskControllerIns.build());
// app.use(hodanControllerIns.build());
// app.use(cuuhoControllerIns.build());

// app.use(tinhControllerIns.build());
// app.use(huyenControllerIns.build());
// app.use(xaControllerIns.build());
app.get('/test', async (req, res) => {
	request("http://localhost:5000/tinh/", (error1, response1, body1) => {
		request("http://localhost:5000/order/", (error2, response2, body2) => {
			response1 = JSON.parse(body1);
			response2 = JSON.parse(body2);
			response1.payment = response2;
			res.send(response1);
		});
	});
});

// categoryControllerIns.gen();
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
