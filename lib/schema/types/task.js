const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

module.exports.TaskType = new GraphQLObjectType({
  name: 'TaskType',
  fields: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});
