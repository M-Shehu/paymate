const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('./index.js');

mongoose.Promise = global.Promise;

const stockSchema = new mongoose.Schema({
  reference: {type: String, unique: true},
  payeeName: String,
  payeeRole: String
});

const Payees = mongoose.model('Payees', stockSchema);

module.exports = Payees;
