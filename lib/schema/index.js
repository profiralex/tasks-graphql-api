const {
  GraphQLSchema,
} = require('graphql');
const query = require('./query');
const mutation = require('./mutation');

module.exports = function () {
  return new GraphQLSchema({
    query: query,
    mutation: mutation,
  });
};
