/*
* @Author: Cao Van Thanh
* @Date:   2020-05-28 01:17:21
* @Last Modified by:   caovanthanh
* @Last Modified time: 2020-09-15 11:42:25
*/

// const userController = require('./user/userController');
// const taskController = require('./task/taskController');
// const todoController = require('./todo/todoController');
const categoryController = require('category/controller');
const productController = require('product/controller');
const cartController = require('cart/controller');

// const userService = require('user/userService');
// const taskService = require('task/taskService');
// const todoService = require('todo/todoService');
const categoryService = require('category/service');
const productService = require('product/service');
const cartService = require('cart/service');
const orderItemService = require('orderItem/service');

module.exports = function initDI() {
	// global.userControllerIns = new userController();
	// global.taskControllerIns = new taskController();
	// global.todoControllerIns = new todoController();
	global.categoryControllerIns = new categoryController();
	global.productControllerIns = new productController();
	global.cartControllerIns = new cartController();

	// global.userServiceIns = new userService();
	// global.taskServiceIns = new taskService();
	// global.todoServiceIns = new todoService();
	global.categoryServiceIns = new categoryService();
	global.productServiceIns = new productService();
	global.cartServiceIns = new cartService();
	global.orderItemServiceIns = new orderItemService();
	
}