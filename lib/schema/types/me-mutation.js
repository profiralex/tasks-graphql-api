const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql');
const {TaskType} = require('./task');
const {TaskInputType} = require('./task-input');
const {TaskMutationType} = require('./task-mutation');
const {TasksService} = require('../../services/tasks');

const tasksService = new TasksService();

module.exports.MeMutationType = new GraphQLObjectType({
  name: 'MeMutationType',
  description: 'Mutations for authenticated users',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    createTask: {
      type: TaskType,
      description: "Mutation to create a task",
      args: {taskInput: {type: new GraphQLNonNull(TaskInputType)}},
      resolve: async (instance, {taskInput}) => {
        return tasksService.create(instance.id, taskInput.title, taskInput.description);
      }
    },
    task: {
      type: TaskMutationType,
      description: "Task dedicated mutations",
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve: async (instance, {id}) => {
        return tasksService.getUserTask(id, instance.id);
      }
    }
  }
});
