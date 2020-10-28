const crudModel = require('crud/model');

class Model extends crudModel{
	constructor(){
		super();
		this.id = null;
		this.update_time = null;

		this.name = null;
		this.phone = null;
		this.volunteer = null;
		this.cuuho = null;
		this.status = null;

		this.geo_longtitude = null;
		this.geo_latitude = null;

		this.location = null;
		this.tinh = null;
		this.huyen = null;
		this.xa = null;
		this.thon = null;
	}
}

module.exports = Model;