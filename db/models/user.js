var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = Mongoose.Schema;

var userSchema = Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  favorites: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'List' }]
})

// user method for generating a hashed password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(plainTextPassword, hash, callback) {
  bcrypt.compare(plainTextPassword, hash, (err, res) => {
    if (err) throw err;
    callback(res);
  });
};

var User = Mongoose.model('User', userSchema);

module.exports = User;