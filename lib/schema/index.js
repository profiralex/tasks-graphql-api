const {
  GraphQLSchema,
} = require('graphql');
const query = require('./query')();

module.exports = function () {
  return new GraphQLSchema({
    query: query,
  });
};
