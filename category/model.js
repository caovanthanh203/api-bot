const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.name = '';
		this.image = '';
	}
}

module.exports = Model;