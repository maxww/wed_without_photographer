import { Router } from 'express';
const router = Router();
import path from 'path';
const homePath = path.join(__dirname, '../../browser/public');

export default router;

import _ from 'lodash';

router.param('id', function (req, res, next, id) {
});

router.get('/', function (req, res, next) {
  console.log('index');
  res.status(200).end();
});

router.post('/', function (req, res, next) {
});

router.get('/upload', function (req, res, next) {
  console.log('upload');
  res.status(200).end();
});

router.get('/pictures', function (req, res, next) {
  console.log('pictures');
  res.status(200).end();
});
