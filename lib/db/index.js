const Loki = require('lokijs');
const db = new Loki('todo-graphql-api.db', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000
});
db.Users = db.addCollection('Users');
db.Tasks = db.addCollection('Tasks');

module.exports = db;
