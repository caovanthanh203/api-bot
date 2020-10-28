const crudService = require('crud/service');
const DAO = require('./dao');
const Model = require('./model');

class Service extends crudService{
	
	name(){
		return 'cart';
	}

	useDAO(){
		return new DAO();
	}

	// async create(model){

	// 	console.log("create task " + model.task_name);

	// 	const task = new Model();
	// 	task.user_id = model.user_id;
	// 	task.task_name = model.task_name;
	// 	task.todo_id = model.todo_id;

	// 	await super.create(task);

	// 	return task;

	// }
	// 
	// 
	async findCartOrCreateForCustomer(customerId){
		let cart, orderItems;
		cart = await this.findCartForCustomer(customerId);
		if (cart == null){
			console.log("create cart")
			cart = await this.createCartForCustomer(customerId);
		} else {
			console.log("inject cart")
			orderItems = await orderItemServiceIns.findOrderItemByCartId(cart.id);
			cart["orderItems"] = orderItems;
		}
		return cart;
	}		

	async findCartForCustomer(customerId) {
		let filter = {};
		let cart;
		filter["customerId"] = customerId;
		filter["status"] = "IN_PROCESS";
		cart = await this.filterByField(filter)
		if (cart.length == 0){
			return null;
		}
		if (cart > 1){
			throw "ERROR";
		}
		if (cart.length == 1){
			return cart[0];
		}
	}

	async findCartById(cartId) {
		let filter = {};
		let cart;
		filter["id"] = cartId;
		cart = await this.filterByField(filter)
		if (cart.length == 0){
			return null;
		}
		if (cart > 1){
			throw "ERROR";
		}
		if (cart.length == 1){
			return cart[0];
		}
	}

	async createCartForCustomer(customerId) {
		const cart = new Model();
		cart.customerId = customerId;
		cart.status = "IN_PROCESS";
		
		await this.getDAOIns().save(cart);
		return await this.findCartForCustomer(customerId);
	}

	async markCartSubmitted(cartId) {
		let cart;
		cart = await this.readById(cartId);
		if (cart == null){
			throw "NOTFOUND";
		} else {
			if (cart.total > 0) {
				cart.status = "SUBMITTED";
				cart = await this.update(cartId, cart);
				return cart;
			} else {
				throw "CAN NOT CHECKOUT";
			}
		}
	}


	async addItemToCart(cartId, itemId) {
		let cart, orderItems, orderItem, product;
		cart = await this.findCartById(cartId);
		product = await productServiceIns.readById(itemId);
		if (cart.length == 0||product == null){
			throw "NOTFOUND";
		} else {
			orderItem = await orderItemServiceIns.create();
			orderItem.name = product.name;
			orderItem.quantity = 1;
			orderItem.price = product.price;
			orderItem.image = product.image;
			orderItem.cartId = cart.id;
			orderItem.productId = product.id;
			cart.total = cart.total + orderItem.price;
			await orderItemServiceIns.save(orderItem);
		}
		return cart;
	}

}
module.exports = Service;