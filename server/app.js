import express from 'express';
const app = express();

export default app;

import bodyParser from 'body-parser';

app.use(express.static('browser/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

import router from './routes';
app.use('/api', router)

import db from './db';

app.listen(7777, function () {
	console.log("now listening port 7777")
})
