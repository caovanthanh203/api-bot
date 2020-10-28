const crudController = require('crud/controller');
const config = require('./config.json');

class Controller extends crudController{

	build(){
		this.mockGet('gen', this.gen.bind(this));
		return super.build();
	}

	usePrefix(){
		return config.usePrefix;
	}

	useService(){
		return xaServiceIns;
	}

	gen(req, res, next) {
		console.log("gen xa");
		let model;
		for (var i = 1; i < 1000; i++) {
			model = this.getServiceIns().create();
			model.id = i;
			model.huyen = this.getRandomInt(100) + 1;
			model.name = "X " + i + " of H " + model.huyen;
			this.getServiceIns().save(model);
		}
        return res.status(200).json({ message: "Finished!" });
	}

	readAll(req, res, next) {
		var filter = {};
		var page = req.query.page?req.query.page:1;
		var limit = req.query.limit?req.query.limit:99999;
		var start = (page > 0)?page - 1:0;
		var end = page>1?page:1;
		limit = limit > 0?limit:20;
		
		filter["huyen"] = parseInt(req.query.huyen)? parseInt(req.query.huyen) : -1;

		this.getServiceIns().readByFilterNoLimit(filter)
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