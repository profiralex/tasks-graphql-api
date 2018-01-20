const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const TaskType = require('./task');
const TaskInputType = require('./task-input');
const TasksService = require('../../services/tasks').TasksService;

const tasksService = new TasksService();

module.exports = new GraphQLObjectType({
  name: 'MeMutationType',
  description: 'Mutations for authenticated users',
  fields: {
    userId: {type: new GraphQLNonNull(GraphQLString)},
    createTask: {
      type: TaskType,
      description: "Task creation mutation",
      args: {taskInput: {type: new GraphQLNonNull(TaskInputType)}},
      resolve: async (instance, {taskInput}) => {
        return tasksService.create(instance.userId, taskInput.title, taskInput.description);
      }
    }
  }
});
