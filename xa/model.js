const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.id = null;
		this.name = null;
		this.huyen = null;
	}
}

module.exports = Model;