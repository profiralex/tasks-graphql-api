const db = require('../db');
const uuidv4 = require("uuid/v4");

module.exports.TasksService = class TasksService {
  create(userId, title, description) {
    const id = uuidv4();
    return db.Tasks.insert({id: id, userId: userId, title: title, description: description, completed: false});
  }

  delete(id, userId) {
    const task = this.getUserTask(id, userId);
    db.Tasks.remove(task);
    return true;
  }

  update(id, userId, data) {
    const task = this.getUserTask(id, userId);
    if (data.title != null) {
      task.title = data.title;
    }

    if (data.description != null) {
      task.description = data.description;
    }

    if (data.completed != null) {
      task.completed = data.completed;
    }

    return db.Tasks.update(task, data);
  }

  getUserTasks(userId) {
    return db.Tasks.find({userId: userId});
  }

  getUserTask(id, userId) {
    const msg = "Task not found";
    const task = db.Tasks.findOne({id: id, userId: userId});

    if (!task) {
      throw new Error(msg);
    }

    return task;
  }
};
