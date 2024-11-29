const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: { type: Object, required: false },
  phone: { type: Number, required: true },
  payment_methods: { type: Array, required: false },
  password: { type: String, required: true },
});

module.exports = mongoose.model('users', userModel);