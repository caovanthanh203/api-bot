const crudController = require('crud/controller');

class Controller extends crudController{

	build(){
		this.mockGet(':categoryId/product', this.readProductInCategory.bind(this));
		// this.mockGet('gen', this.gen.bind(this));
		return super.build();
	}

	usePrefix(){
		return 'category';
	}

	useService(){
		return categoryServiceIns;
	}

	gen() {
		let category;
		for (var i = 0; i < 5; i++) {
			category = this.getServiceIns().create();
			category.name = "Category " + i;
			category.image = "https://dummyimage.com/400x400/319431/ffffff.png&text=" + category.name;
			this.getServiceIns().save(category);
		}
	}

	readAll(req, res, next) {
		this.getServiceIns().readAll()
        .then(models => res.json({
        	"categories": models
        }))
        .catch(err => next(err));
	}

	readProductInCategory(req, res, next) {
		var filter = {};
		filter["categoryId"] = req.params.categoryId;
		productServiceIns.filterByField(filter)
		.then(models => res.json({
        	"products": models
        }))
		.catch(err => next(err));
	}
	
}

module.exports = Controller;