const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql');
const {TaskType} = require('./task');
const {TasksService} = require('../../services/tasks');

const tasksService = new TasksService();

module.exports.MeQueryType = new GraphQLObjectType({
  name: 'MeQueryType',
  description: 'Queries for authenticated users',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async (instance) => {
        return tasksService.getUserTasks(instance.id);
      }
    }
  }
});
