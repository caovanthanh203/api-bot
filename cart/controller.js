const crudController = require('crud/controller');

class Controller extends crudController{

	build(){
		this.mockGet('customer/:customerId', this.findCartForCustomerId.bind(this));
		this.mockPost(':cartId/checkout', this.checkout.bind(this));
		this.mockPost(':cartId/item', this.addItemToCart.bind(this));
		return super.build();
	}

	usePrefix(){
		return 'cart';
	}

	useService(){
		return cartServiceIns;
	}

	readAll(req, res, next) {
		this.getServiceIns().readAll()
        .then(models => res.json(models))
        .catch(err => next(err));
	}

	async findCartForCustomerId(req, res, next) {
		let customerId, cart;
		customerId = req.params.customerId;
		cart = await this.getServiceIns().findCartOrCreateForCustomer(customerId);
		res.json(cart);
	}

	async addItemToCart(req, res, next) {
		let cartId, itemId;
		cartId = req.params.cartId;
		itemId = req.query.itemId;
		this.getServiceIns().addItemToCart(cartId, itemId)
		.then(function(cart){
			res.json(cart);
		})
		.catch(function(err){
			next(err);
		});
	}

	async checkout(req, res, next) {
		let cartId, cart;
		cartId = req.params.cartId;
		this.getServiceIns().markCartSubmitted(cartId)
		.then(function(cart){
			res.json(cart);
		})
		.catch(function(err){
			next(err);
		});
	}
	
}

module.exports = Controller;