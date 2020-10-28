const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.name = '';
		this.quantity = '';
		this.image = '';
		this.price = '';
		this.cartId = '';
		this.productId = '';
	}
}

module.exports = Model;