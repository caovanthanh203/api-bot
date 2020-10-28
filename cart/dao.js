const crudDAO = require('crud/dao');

class DAO extends crudDAO{

	name(){
		return 'cart';
	}
	
	useTable (){
		return 'cart';
	}

}

module.exports = DAO;