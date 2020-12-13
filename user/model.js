const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.username = '';
		this.firstName = '';
		this.lastName = '';
	}
}

module.exports = Model;