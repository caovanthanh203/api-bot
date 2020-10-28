const crudService = require('crud/service');
const DAO = require('./dao');
const Model = require('./model');

class Service extends crudService{
	
	name(){
		return 'product';
	}

	useDAO(){
		return new DAO();
	}

	create() {
		return new Model();
	}

}
module.exports = Service;