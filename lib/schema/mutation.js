const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const MeMutationType = require('./types/me-mutation')();
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
      },
      me: {
        type: MeMutationType,
        args: {
          token: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (instance, {token}) => {
          const user = usersService.authenticate(token);
          return {userId: user.id};
        }
      }
    }
  });
};
