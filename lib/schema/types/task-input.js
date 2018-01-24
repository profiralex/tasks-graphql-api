const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

module.exports.TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInputType',
  fields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
  }
});
