const {
  GraphQLObjectType
} = require('graphql');
const stats = require('./types/stats')();

module.exports = function () {
  return new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'The root for all queries',
    fields: {
      stats: {
        type: stats,
        resolve() {
          return {users: 10, todos: 1000, todosCompleted: 100}
        }
      }
    }
  });
};
