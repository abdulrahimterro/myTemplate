const mongodb = require('./MongoDB');
const { Sequelize } = require('sequelize');
const { MySql } = require('../../config').database;

const initMongo = () =>
	Promise.all([mongodb.connection]).then(() => {
		console.log('MongoDB Connected...');
	});

const sequelize = new Sequelize(MySql.dataBaseName, MySql.userName, MySql.password, {
	dialect: MySql.dialect,
	logging: false,
	define: { timestamps: false },
});

module.exports = {
	initMongo,
	mongodb,
	sequelize,
};
