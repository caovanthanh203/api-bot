const crudController = require('crud/controller');
const config = require('./config.json');

class Controller extends crudController{

	build(){
		this.mockGet(':categoryId/product', this.readProductInCategory.bind(this));
		this.mockGet('reload', this.reloadDb.bind(this));
		this.mockGet('gen', this.gen.bind(this));
		return super.build();
	}

	usePrefix(){
		return config.usePrefix;
	}

	useService(){
		return hodanServiceIns;
	}

	gen() {
		console.log("gen hodan");
		let model;
		for (var i = 1; i < 100; i++) {
			model = this.getServiceIns().create();
			model.id = i;
			model.update_time = Date.now();
			model.status = this.getRandomInt(8);

			model.name = "Ho dan " + i;
			model.phone = "012345678" + i;
			model.volunteer = null;
			model.cuuho = null;

			model.geo_longtitude = null;
			model.geo_latitude = null;

			model.location = null;
			model.tinh = this.getRandomInt(10);
			model.huyen = this.getRandomInt(10);
			model.xa = this.getRandomInt(10);
			model.thon = null;
			this.getServiceIns().save(model);
		}
	}

	readAll(req, res, next) {
		var filter = {};
		var page = req.query.page?req.query.page:1;
		var limit = req.query.limit?req.query.limit:20;
		var start = (page > 0)?page - 1:0;
		var end = page>1?page:1;
		limit = limit > 0?limit:20;
		
		if (parseInt(req.query.status)) filter["status"] = parseInt(req.query.status);
		if (parseInt(req.query.tinh)) filter["tinh"] = parseInt(req.query.tinh);
		if (parseInt(req.query.huyen)) filter["huyen"] = parseInt(req.query.huyen);
		if (parseInt(req.query.xa)) filter["xa"] = parseInt(req.query.xa);

		this.getServiceIns().readByFilterWithLimit(filter, start*limit, end*limit)
        .then(models => res.json({
        	"results": models
        }))
        .catch(err => next(err));
	}

	reloadDb(req, res, next) {
		this.getServiceIns().reloadDb();
        return res.status(200).json({ message: "Reloaded!" });
	}

	readProductInCategory(req, res, next) {
		var filter = {};
		filter["status"] = req.params.categoryId;
		productServiceIns.filterByField(filter)

		.then(models => res.json({
        	"products": models
        }))
		.catch(err => next(err));
	}
	
}

module.exports = Controller;