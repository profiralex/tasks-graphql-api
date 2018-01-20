const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'TaskInputType',
  fields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
  }
});
