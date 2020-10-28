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
		return huyenServiceIns;
	}

	gen(req, res, next) {
		console.log("gen huyen");
		let model;
		for (var i = 1; i < 100; i++) {
			model = this.getServiceIns().create();
			model.id = i;
			model.tinh = this.getRandomInt(10) + 1;
			model.name = "H " + i + " of T " + model.tinh;
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
		
		filter["tinh"] = parseInt(req.query.tinh)? parseInt(req.query.tinh) : -1;

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