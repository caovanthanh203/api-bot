const crudDAO = require('crud/dao');

class DAO extends crudDAO{

	name(){
		return 'orderItem';
	}
	
	useTable (){
		return 'orderItem';
	}

}

module.exports = DAO;