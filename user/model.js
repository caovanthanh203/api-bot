const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.username = '';
		this.firstname = '';
		this.lastname = '';
		this.lastname = '';
		this.birthdate = '';
	}
}

module.exports = Model;