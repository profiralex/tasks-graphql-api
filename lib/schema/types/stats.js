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
      todos: {type: GraphQLInt, description: 'The number ot todo items created'},
      todosCompleted: {type: GraphQLInt, description: 'The number of todo items completed'}
    }
  });
};
