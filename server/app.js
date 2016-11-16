import express from 'express';
const app = express();

export default app;

import bodyParser from 'body-parser';

app.use(express.static('browser/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

import router from './routes';
app.use('/', router)

import db from './db';

const PORT = process.env.PORT || 7777;

app.listen(PORT, function () {
	console.log(`now listening port ${PORT}`);
})
