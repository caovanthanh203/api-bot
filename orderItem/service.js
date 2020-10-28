const crudService = require('crud/service');
const DAO = require('./dao');
const Model = require('./model');

class Service extends crudService{
	
	name(){
		return 'orderItem';
	}

	useDAO(){
		return new DAO();
	}

	create() {
		return new Model();
	}

	async findOrderItemByCartId(cartId) {
		var filter = {};
		filter["cartId"] = cartId;
		return await this.getDAOIns().filterByField(filter);
	}


}
module.exports = Service;