const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const {MeMutationType} = require('./types/me');
const {UsersService} = require('../services/users');

const usersService = new UsersService();

module.exports.RootMutationType = new GraphQLObjectType({
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
    },
    me: {
      type: MeMutationType,
      args: {
        token: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (instance, {token}) => {
        return usersService.authenticate(token);
      }
    }
  }
});
