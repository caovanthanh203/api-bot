const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.name = null;
	}
}

module.exports = Model;