const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const {
	createAssetsDir,
	Exception,
	logger: { console, httpLogger },
} = require('../../utils');

module.exports = (app) => {
	// createAssetsDir(); //create assets directories

	app.use('/api/assets', express.static(path.join(__dirname, '../../assets')));

	app.use(helmet());
	app.use(cors());
	// urlencoded Parser
	app.use(express.urlencoded({ extended: false }));
	// JSON Parser
	app.use(express.json({ limit: '50mb' }));

	// HTTP Logger
	app.use(httpLogger);
	// Main API Private Router
	// app.use('/api/private', require('./router'));
	// // Main API Public Router
	// app.use('/api/public', require('./publicRouter'));

	// Request Error Handler
	app.use(Exception.handler);
};
