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
		return cuuhoServiceIns;
	}

	gen(req, res, next) {
		console.log("gen cuuho");
		let model;
		for (var i = 1; i < 30; i++) {
			model = this.getServiceIns().create();
			model.id = i;
			model.update_time = "2020-10-28T19:37:07.124516+07:00";
			model.status = this.getRandomInt(4);

			model.name = "Cuu ho " + i;
			model.phone = "012345678" + i;
			model.volunteer = null;
			model.cuuho = null;

			model.geo_longtitude = null;
			model.geo_latitude = null;

			model.location = null;
			model.tinh = this.getRandomInt(10);
			model.huyen = this.getRandomInt(100);
			model.xa = this.getRandomInt(1000);
			model.thon = null;
			this.getServiceIns().save(model);
		}
        return res.status(200).json({ message: "Finished!" });
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
	
}

module.exports = Controller;