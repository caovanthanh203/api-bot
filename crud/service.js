const DAO = require('crud/dao');

class Service{

	constructor () {
		console.log('create ' + this.name() + ' service');
	}

	name(){
		return 'base';
	}

	useDAO() {
		return new DAO();
	}

	getDAOIns(){
		if (this.daoIns === undefined){
			this.daoIns = this.useDAO();
		}
		return this.daoIns;
	}
	
	async save(model) {
		return await this.getDAOIns().save(model);
	}

	async readAll() {
		return await this.getDAOIns().readAll();
	}

	async readLimit(from, to) {
		return await this.getDAOIns().readLimit(from, to);
	}

	async readByFilterWithLimit(filter, from, to) {
		return await this.getDAOIns().readByFilterWithLimit(filter, from, to);
	}

	async readById(id) {
		return await this.readByField('id', id);
	}

	async readByField(field, value) {
		return await this.getDAOIns().readByField(field, value);
	}

	async filterByField(field, value) {
		return await this.getDAOIns().filterByField(field, value);
	}

	async update(id, model) {
		return await this.getDAOIns().update(id, model);
	}

	async delete(id) {
		return await this.getDAOIns().delete(id);
	}

	async getNextId(id) {
		return await this.getDAOIns().getNextId();
	}

	async hotReload(id) {
		await this.getDAOIns().reloadDb();
	}

}

module.exports = Service;