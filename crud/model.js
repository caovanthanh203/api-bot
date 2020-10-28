const { v4: uuidv4 } = require('uuid');

class Model{

	constructor(){
		this.id = uuidv4();
	}

	validate(){
		console.log('run validate');
	}
	
}

module.exports = Model;