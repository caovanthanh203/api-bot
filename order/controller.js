const crudController = require('crud/controller');

class Controller extends crudController{

	build(){
		// this.mockGet('todo_id/:id', this.readByTodoId.bind(this));
		return super.build();
	}

	usePrefix(){
		return 'category';
	}

	useService(){
		return categoryServiceIns;
	}

	readAll(req, res, next) {
		this.getServiceIns().readAll()
        .then(models => res.json(models))
        .catch(err => next(err));
	}
	
}

module.exports = Controller;