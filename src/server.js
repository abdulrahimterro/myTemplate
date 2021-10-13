require('./init')();
const { port } = require('config-keys');
const { Exception, logger, socket } = require('utils');
const express = require('express');
const database = require('./database');

const start = async () => {
	// Catching errors
	require('express-async-errors');
	const app = express();
	// App Configuration
	require('./app')(app);

	console.log('Connection to MongoDB');
	await database.initMongo();

	console.log('Connecting to MySql DB');
	await database.sequelize.authenticate();
	console.log('MySql DB Is ready');
	await database.sequelize.sync().then(() => {
		console.log('the database synchronized successfully');
	});

	// Creating the server
	const httpServer = require('http').createServer(app);
	// socket.init(httpServer);
	httpServer.listen(port, () => {
		console.info(`Server is listening on port ${port}`);
	});
};

start().catch(Exception.defaultHandler);
