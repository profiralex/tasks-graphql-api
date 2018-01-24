const {
  GraphQLSchema,
} = require('graphql');
const {RootMutationType} = require('./mutation');
const {RootQueryType} = require('./query');

module.exports = new GraphQLSchema({
  mutation: RootMutationType,
  query: RootQueryType,
});
