const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = function () {
  return new GraphQLInputObjectType({
    name: 'TaskInputType',
    fields: {
      title: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: new GraphQLNonNull(GraphQLString)},
    }
  });
};
