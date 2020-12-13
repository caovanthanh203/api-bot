const crudService = require('crud/service');

class Service extends crudService{
	
	async create(res){
		console.log(res);
		let model;
		model = this.createModel();
		model.payment = res.payment;
		model.value = res.value;
		model.unit = res.unit;
		console.log(model);
		// model.validate();
		return await this.save(model);
	}

}
module.exports = Service;