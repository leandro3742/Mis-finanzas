
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchase_models = new Schema({
  products: { type: Object, required: false },
  category: { type: String, required: true },
  payment_method: { type: Object, required: false },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  photo: { type: String, required: false },
});

const Purchase = mongoose.model('purchases', purchase_models);
module.exports = Purchase;
