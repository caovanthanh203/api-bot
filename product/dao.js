const crudDAO = require('crud/dao');

class DAO extends crudDAO{

	name(){
		return 'product';
	}
	
	useTable (){
		return 'product';
	}

}

module.exports = DAO;