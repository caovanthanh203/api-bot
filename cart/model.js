const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.status = '';
		this.total = 0;
		this.orderItems = [];
		this.customerId = '';
	}
}

module.exports = Model;