const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.payment = null;
		this.value = null;
		this.unit = null;
	}
}

module.exports = Model;