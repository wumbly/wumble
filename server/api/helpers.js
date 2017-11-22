const ToDo = require('../../db/models/todo');
const User = require('../../db/models/user');

let helpers = {};

// helpers.addToDo = function(data, callback) {

//   var todoItem = new ToDo({
//     itemId: 1,
//     item: data.input,
//     completed: false
//   });

//   todoItem.save((err, result) => {
//     if (err) { 
//       console.log('TodoItem save failed. ', err);
//     }
//     console.log('TodoItem saved successfully.');
//     callback();
//   });
// };

helpers.signup = function(data, callback) {
  var user = new User({
    username: data.username,
    password: User.prototype.generateHash.call(this, data.password)
  });

  user.save((err, result) => {
    if (err) { 
      console.log('SERVER: User save failed. ', err);
    };
    callback('SERVER: Signup successful.');
  });

};

helpers.login = function(data, callback) {
  var query = User.find({'username': data.username}, 'username password', (err, user) => {
    if (err) throw err;
    else if (user.length === 0) {
      callback(`SERVER: User ${data.username} not found.`);
    } else {
        User.prototype.validatePassword.call(this, data.password, user[0].password, (res) => {
        if (res) {
          callback('SERVER: Login successful.');
        } else {
          callback('SERVER: Password does not match.');
        }
      });
    }
  });
};

module.exports = helpers;