const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

module.exports = function () {
  return new GraphQLObjectType({
    name: 'TaskType',
    fields: {
      title: {type: GraphQLString},
      description: {type: GraphQLString},
      completed: {type: GraphQLBoolean},
    }
  });
};
