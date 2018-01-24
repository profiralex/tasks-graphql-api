const {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLString
} = require('graphql');

module.exports.TaskUpdateType = new GraphQLInputObjectType({
  name: 'TaskUpdateType',
  fields: {
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});
