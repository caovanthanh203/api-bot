const crudDAO = require('crud/dao');

class DAO extends crudDAO{

	name(){
		return 'category';
	}
	
	useTable (){
		return 'category';
	}

}

module.exports = DAO;