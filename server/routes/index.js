import { Router } from 'express';
const router = Router();
export default router;

import _ from 'lodash';

router.param('id', function (req, res, next, id) {
	// Todo.findById(id).exec()
	// 	.then(function (todo) {
	// 		if (todo) {
	// 			req.todo = todo;
	// 			next();
	// 		} else {
	// 			res.status(404).end();
	// 		}
	// 	})
	// 	.catch(next);
});

router.get('/', function (req, res, next) {
	// Todo.find({}).exec()
	// 	.then(function (todos) {
	// 		res.status(200).json(todos);
	// 	})
	// 	.catch(next)
});

router.post('/', function (req, res, next) {
	// Todo.create(req.body)
	// 	.then(function (todo) {
	// 		res.status(201).json(todo)
	// 	})
	// 	.then(null, next)
});
