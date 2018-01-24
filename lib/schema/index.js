const {
  GraphQLSchema,
} = require('graphql');
const {RootMutationType} = require('./mutation');
const {RootQueryType} = require('./query');

module.exports = function () {
  return new GraphQLSchema({
    mutation: RootMutationType,
    query: RootQueryType,
  });
};
