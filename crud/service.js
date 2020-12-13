class Service{
	constructor (route) {
		this.route = route;
		console.log('create ' + this.name() + ' service');
	}

	name(){
		return this.route;
	}

	useDAO() {
		return daos[this.name()];
	}

	getDAOIns(){
		if (this.daoIns === undefined){
			this.daoIns = this.useDAO();
		}
		return this.daoIns;
	}

	createModel() {
		return new models[this.name()]();
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

	async readByFilterNoLimit(filter) {
		return await this.getDAOIns().readByFilterNoLimit(filter);
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