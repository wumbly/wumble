const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var toDoSchema = new Schema({
  itemId: Number,
  item: String,
  completed: Boolean
}, {collection: 'TodoList'});

var ToDo = Mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;