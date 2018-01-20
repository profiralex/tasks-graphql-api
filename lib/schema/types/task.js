const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'TaskType',
  fields: {
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});
