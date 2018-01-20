const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const UsersService = require('../services/users').UsersService;

const usersService = new UsersService();

module.exports = function () {
  return new GraphQLObjectType({
    name: 'RootMutationType',
    description: 'The root for all mutations',
    fields: {
      register: {
        type: GraphQLString,
        args: {
          username: {type: new GraphQLNonNull(GraphQLString)},
          password: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (instance, {username, password}) => {
          return await usersService.register(username, password);
        }
      },
      login: {
        type: GraphQLString,
        args: {
          username: {type: new GraphQLNonNull(GraphQLString)},
          password: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (instance, {username, password}) => {
          return await usersService.login(username, password);
        }
      }
    }
  });
};
