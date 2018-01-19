const {
  GraphQLObjectType,
  GraphQLInt
} = require('graphql');

module.exports = function () {
  return new GraphQLObjectType({
    name: 'StatsType',
    description: 'Stats for API',
    fields: {
      users: {type: GraphQLInt, description: 'The number of users registered'},
      tasks: {type: GraphQLInt, description: 'The number ot tasks created'},
      tasksCompleted: {type: GraphQLInt, description: 'The number of tasks completed'}
    }
  });
};
