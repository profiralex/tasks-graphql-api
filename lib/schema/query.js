const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const {StatsType} = require('./types/stats');
const {MeQueryType} = require('./types/me');
const {StatsService} = require('../services/stats');
const {UsersService} = require('../services/users');

const statsService = new StatsService();
const usersService = new UsersService();

module.exports.RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'The root for all queries',
  fields: {
    stats: {
      type: StatsType,
      resolve() {
        return statsService.getStats()
      }
    },
    me: {
      type: MeQueryType,
      args: {
        token: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (instance, {token}) => {
        return usersService.authenticate(token);
      }
    }
  }
});
