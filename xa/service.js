const crudService = require('crud/service');

class Service extends crudService{
	
	async create(res){
		console.log(res);
		let model;
		model = this.createModel();
		model.name = res.name;
		console.log(model);
		// model.validate();
		return await this.save(model);
	}

}
module.exports = Service;