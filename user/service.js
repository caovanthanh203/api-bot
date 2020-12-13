const crudService = require('crud/service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config.json');

class Service extends crudService{

	async login(username, password) {
		const user = await super.readByField('username', username);
		if (user && bcrypt.compareSync(password, user.hash)) {
			const token = jwt.sign({ sub: user.id }, config.secret);
			return {
				...user,
				token
			};
		}
	}

	async create(model){

		console.log(await super.readByField('username', model.username));

		if (await super.readByField('username', model.username)) {
			throw 'Username "' + model.username + '" is already taken';
		}

		let user = this.createModel();
		user.username = model.username;
		user.firstName = model.firstName;
		user.lastName = model.lastName;

		if (model.password) {
			user.hash = bcrypt.hashSync(model.password, 10);
		}

		await this.save(user);

		const token = jwt.sign({ sub: user.id }, config.secret);

		return {
			username: user.username,
			token
		};

	}

}
module.exports = Service;