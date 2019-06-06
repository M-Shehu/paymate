const mongoose = require('mongoose');

// const mongoUri = 'mongodb://database/stock-chart';
const herokuUri = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds225375.mlab.com:25375/heroku_4fl1l06w`;

mongoose.connect(herokuUri);
const db = mongoose.connection;

module.exports = db;
