const express = require('express');
const router = express.Router();
const service = require('crud/service');

class Controller {

	constructor(){
		console.log('create ' + this.format('') + ' controller');
	}

	build(){
		this.mockPost('create', this.create.bind(this));
		this.mockGet('', this.readAll.bind(this));
		this.mockGet('hot-reload', this.hotReload.bind(this));
		this.mockGet(':id', this.readById.bind(this));
		this.mockPost('update/:id', this.update.bind(this));
		this.mockPost('delete/:id', this.delete.bind(this));
		return router;
	}

	mockGet(route, action){
		console.log('mock ' + this.format(route) + ' endpoint');
		router.get(this.format(route), action);
	}

	mockPost(route, action){
		console.log('mock ' + this.format(route) + ' endpoint');
		router.post(this.format(route), action);
	}

	format(route){
		if (this.usePrefix() == ''){
			return '/' + route;
		} else {
			return '/' + this.usePrefix() + '/' + route;
		}
		return 'users';
	}

	useService() {
		return new service();
	}

	getService(){
		return this.getServiceIns();
	}

	getServiceIns(){
		return this.useService();
	}

	usePrefix(){
		return 'base';
	}

	create(req, res, next) {
		this.getServiceIns().create(req.body)
        .then(model => res.json(model))
        .catch(err => next(err));
	}

	readAll(req, res, next) {
		var filter = {};
		filter["user_id"] = req.body.user_id;
		this.getServiceIns().filterByField(filter)
        .then(models => res.json(models))
        .catch(err => next(err));
	}

	readById(req, res, next) {
		this.getServiceIns().readById(req.params.id)
        .then(model => model ? res.json(model) : res.sendStatus(404))
        .catch(err => next(err));
	}

	update(req, res, next) {
		this.getServiceIns().update(req.params.id, req.body)
        .then(models => res.json(models))
        .catch(err => next(err));
	}

	delete(req, res, next) {
		this.getServiceIns().delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
	}

	getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	hotReload(req, res, next) {
  		this.getServiceIns().hotReload();
  		res.status(200).json({ message: "Reloaded!" });
	}

}

module.exports = Controller;