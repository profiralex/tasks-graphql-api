const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const StatsType = require('./types/stats');
const MeQueryType = require('./types/me-query');
const StatsService = require('../services/stats').StatsService;
const UsersService = require('../services/users').UsersService;

const statsService = new StatsService();
const usersService = new UsersService();

module.exports = new GraphQLObjectType({
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
        const user = usersService.authenticate(token);
        return {userId: user.id, username: user.username};
      }
    }
  }
});
