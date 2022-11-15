const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');
const { branchQueries, branchMutations } = require('./src/resolvers/branchResolvers');

const resolvers = {
  Query: {
    ...bankQueries,
    ...branchQueries
  },
  Mutation: {
    ...bankMutations,
    ...branchMutations
  }
};

module.exports = resolvers;