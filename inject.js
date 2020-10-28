/*
* @Author: Cao Van Thanh
* @Date:   2020-05-28 01:17:21
* @Last Modified by:   Cao Van Thanh
* @Last Modified time: 2020-10-28 22:33:30
*/

// const userController = require('./user/userController');
// const taskController = require('./task/taskController');
// const todoController = require('./todo/todoController');
const hodanController = require('hodan/controller');
const cuuhoController = require('cuuho/controller');

// const userService = require('user/userService');
// const taskService = require('task/taskService');
// const todoService = require('todo/todoService');
const hodanService = require('hodan/service');
const cuuhoService = require('cuuho/service');

module.exports = function initDI() {
	// global.userControllerIns = new userController();
	// global.taskControllerIns = new taskController();
	// global.todoControllerIns = new todoController();
	global.hodanControllerIns = new hodanController();
	global.cuuhoControllerIns = new cuuhoController();

	// global.userServiceIns = new userService();
	// global.taskServiceIns = new taskService();
	// global.todoServiceIns = new todoService();
	global.hodanServiceIns = new hodanService();
	global.cuuhoServiceIns = new cuuhoService();
	
}