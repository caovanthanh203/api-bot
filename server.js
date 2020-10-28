require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helper/errorHandlers');
const fs = require('fs')

const path = './db.json'

// fs.unlink(path, (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

const inject = require('inject');
inject();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// var myLogger = function check(req, res, next) {
//   	console.log('LOGGED')
//   	// err = new Error();
//   	// err.name = "UnauthorizedError";
//   	next()
// }

// use JWT auth to secure the api
// app.use(jwt());

// api routes
// app.use(userControllerIns.build());
// app.use(todoControllerIns.build());
// app.use(taskControllerIns.build());
app.use(hodanControllerIns.build());
app.use(cuuhoControllerIns.build());
app.use(tinhControllerIns.build());
app.use(huyenControllerIns.build());
app.use(xaControllerIns.build());

// categoryControllerIns.gen();
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
