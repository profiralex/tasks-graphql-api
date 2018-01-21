const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const TaskType = require('./task');
const TaskInputType = require('./task-input');
const TaskMutationType = require('./task-mutation');
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
    },
    task: {
      type: TaskMutationType,
      description: "Created tasks mutations",
      args: {id: {type: new GraphQLNonNull(GraphQLString)}},
      resolve: async (instance, {id}) => {
        return tasksService.getUserTask(id, instance.userId);
      }
    }
  }
});
