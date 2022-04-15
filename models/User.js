const { Schema, model, ObjectId } = require('mongoose');

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  balance: { type: Number, default: 0 },
  stocks: { type: ObjectId, ref: 'Stock' },
  avatar: { type: String },
  birthday: { type: Date, default: null },
});

module.exports = model('User', User);
