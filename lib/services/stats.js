const db = require('../db');

module.exports.StatsService = class StatsService {
  getStats() {
    const users = db.Users.count();
    const tasks = db.Tasks.count();
    const tasksCompleted = db.Tasks.count({completed: true});
    return {
      users: users,
      tasks: tasks,
      tasksCompleted: tasksCompleted
    };
  }
};
