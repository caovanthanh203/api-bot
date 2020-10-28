const crudService = require('crud/service');
const DAO = require('./dao');
const Model = require('./model');
const config = require('./config.json');

class Service extends crudService{
	
	name(){
		return config.serviceName;
	}

	useDAO(){
		return new DAO();
	}

	create() {
		return new Model();
	}

}
module.exports = Service;