const {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'TaskUpdateType',
  fields: {
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});
