const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql');
const {TaskType} = require('./task');
const {TaskUpdateType} = require('./task-update');
const {TasksService} = require('../../services/tasks');

const tasksService = new TasksService();

module.exports.TaskMutationType = new GraphQLObjectType({
  name: 'TaskMutationType',
  description: 'Mutations for task type',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    delete: {
      type: GraphQLNonNull(GraphQLBoolean),
      resolve: (instance) => {
        return tasksService.delete(instance.id, instance.userId);
      }
    },
    update: {
      type: TaskType,
      args: {taskUpdate: {type: new GraphQLNonNull(TaskUpdateType)}},
      resolve: async (instance, {taskUpdate}) => {
        return tasksService.update(instance.id, instance.userId, taskUpdate);
      }
    }
  }
});
