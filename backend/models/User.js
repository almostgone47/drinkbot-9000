const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  drinks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Drink',
    },
  ],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
