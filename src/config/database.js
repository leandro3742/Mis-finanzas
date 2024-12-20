const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI);
require('../users/user.model');
require('../purchase/purchase.model');
module.exports = { db };