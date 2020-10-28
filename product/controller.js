const crudController = require('crud/controller');

class Controller extends crudController{

	build(){
		return super.build();
	}

	usePrefix(){
		return 'product';
	}

	useService(){
		return productServiceIns;
	}

	readAll(req, res, next) {
		this.getServiceIns().readAll()
		.then(models => res.json(models))
		.catch(err => next(err));
	}

	async gen() {
		let categories, product, categoryId;
		categories = await categoryServiceIns.readAll();
		for (var j = 0; j < 30; j++){
			categoryId = this.randomInt(0, categories.length - 1);
			product = this.getServiceIns().create();
			product.name = "Product " + j;
			product.price = this.randomInt(1, 25);
			product.categoryId = categories[categoryId].id;
			product.image = "https://dummyimage.com/400x400/319431/ffffff.png&text=" + product.name;
			this.getServiceIns().save(product);
		}
	}

	randomInt(min, max) {
		return min + Math.floor((max - min) * Math.random());
	}

	randomFloat(min, max) {
    	return Math.round(min + (max - min) * Math.random(), 2);
	}

	// readByCategoryId(req, res, next) {
	// 	var filter = {};
	// 	console.log(req.params);
	// 	filter["category_id"] = parseInt(req.params.category_id);
	// 	console.log(filter);
	// 	this.getService().filterByField(filter)
	// 	.then(models => res.json({
 //        	"products": models
 //        }))
	// 	.catch(err => next(err));
	// }
	
}

module.exports = Controller;