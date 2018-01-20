const db = require('../db');
const uuidv4 = require("uuid/v4");

module.exports.TasksService = class TasksService {
  create(userId, title, description) {
    const id = uuidv4();
    return db.Tasks.insert({id: id, userId: userId, title: title, description: description, completed: false});
  }
};
