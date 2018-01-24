const Loki = require('lokijs');
const db = new Loki('tasks-graphql-api.db');
db.Users = db.addCollection('Users');
db.Tasks = db.addCollection('Tasks');

module.exports = db;
