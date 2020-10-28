const crudDAO = require('crud/dao');
const config = require('./config.json');

class DAO extends crudDAO{

	name(){
		return config.daoName;
	}
	
	useTable (){
		return config.tableName;
	}

}

module.exports = DAO;