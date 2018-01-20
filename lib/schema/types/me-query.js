const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const TaskType = require('./task');
const TasksService = require('../../services/tasks').TasksService;

const tasksService = new TasksService();

module.exports = new GraphQLObjectType({
  name: 'MeQueryType',
  description: 'Queries for authenticated users',
  fields: {
    userId: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async (instance) => {
        return tasksService.getUserTasks(instance.userId);
      }
    }
  }
});
