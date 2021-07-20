const crudService = require('crud/service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config.json');

class Service extends crudService{

	async login(username, password) {
		console.log("login " + username + " - " + password);
		const user = await super.readByField('username', username);
		console.log(user);
		if (user && bcrypt.compareSync(password, user.hash)) {
			const token = jwt.sign({ sub: user.id }, config.secret);
			return {
				...user,
				token
			};
		}
	}

	async create(model){

		// console.log(await super.readByField('username', model.username));
		// 
		if (await super.readByField('username', model.username)) {
			throw 'Tài khoản "' + model.username + '" đã được đăng ký rồi';
		}

		if (!model.username || !model.password) {
			throw 'Tài khoản và mật khẩu là bắt buộc!';
		}

		if (!(model.password_confirmation == model.password)) {
			throw 'Mật khẩu và mật khẩu xác nhận không khớp!';
		}

		let user = this.createModel();
		user.username = model.username;
		user.firstname = model.firstname;
		user.lastname = model.lastname;

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