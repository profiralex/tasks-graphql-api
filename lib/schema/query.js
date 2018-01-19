const {
  GraphQLObjectType
} = require('graphql');
const stats = require('./types/stats')();
const StatsService = require('../services/stats').StatsService;
const statsService = new StatsService();

module.exports = function () {
  return new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'The root for all queries',
    fields: {
      stats: {
        type: stats,
        resolve() {
          return statsService.getStats()
        }
      }
    }
  });
};
