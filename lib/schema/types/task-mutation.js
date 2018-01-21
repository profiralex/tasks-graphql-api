const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} = require('graphql');
const TaskType = require('./task');
const TaskUpdate = require('./task-update');
const TasksService = require('../../services/tasks').TasksService;

const tasksService = new TasksService();

module.exports = new GraphQLObjectType({
  name: 'TaskMutationType',
  description: 'Mutations for task type',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLString)},
    delete: {
      type: GraphQLNonNull(GraphQLBoolean),
      resolve: (instance) => {
        return tasksService.delete(instance.id, instance.userId);
      }
    },
    update: {
      type: TaskType,
      args: {taskUpdate: {type: new GraphQLNonNull(TaskUpdate)}},
      resolve: async (instance, {taskUpdate}) => {
        return tasksService.update(instance.id, instance.userId, taskUpdate);
      }
    }
  }
});
