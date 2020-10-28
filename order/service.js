const crudService = require('crud/service');
const DAO = require('./dao');
// const Model = require('./model');

class Service extends crudService{
	
	name(){
		return 'category';
	}

	useDAO(){
		return new DAO();
	}

	// async create(model){

	// 	console.log("create task " + model.task_name);
		
	// 	const task = new Model();
	// 	task.user_id = model.user_id;
	// 	task.task_name = model.task_name;
	// 	task.todo_id = model.todo_id;

	// 	await super.create(task);

	// 	return task;

	// }

}
module.exports = Service;