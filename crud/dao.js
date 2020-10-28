const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const config = require('config.json');

// db.defaults(config.schema).write();

class DAO{
	
	constructor () {
		console.log('create ' + this.name() + ' dao');
	}

	name(){
		return 'base';
	}

	useTable(){
		return 'base';
	}
	
	save(model) {
		return db.get(this.useTable()).push(model).write();
	}

	readAll() {
		return db.get(this.useTable()).value();
	}

	readLimit(from, to) {
		return db.get(this.useTable()).slice(from, to);
	}

	readByFilterWithLimit(filter, from, to) {
		console.log(filter);
		return db.get(this.useTable()).filter(filter).slice(from, to).value();
	}

	readById(modelId) {
		return this.readByField('id', modelId);
	}

	readByField(field, value) {
		let model;
		var filter = {};
		filter[field] = value;
		model = db.get(this.useTable()).filter(filter).value();
		if (model.length == 1){
			return model[0];
		}
		return null;
	}

	filterByField(field, value) {
		var filter = {};
		filter[field] = value;
		return db.get(this.useTable()).filter(filter).value();
	}

	filterByField(filter) {
		return db.get(this.useTable()).filter(filter).value();
	}

	update(modelId, model) {
		return db.get(this.useTable()).find({id: modelId}).assign(model).write();
	}

	delete(modelId) {
		return db.get(this.useTable()).find({id: modelId}).assign(modelId).write();
	}

	getNextId() {
		return this.readAll().length;
	}

	reloadDb() {
		db.read();
	}

}

module.exports = DAO;