const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.name = '';
		this.price = 0;
		this.image = '';
		this.categoryId = '';
	}
}

module.exports = Model;