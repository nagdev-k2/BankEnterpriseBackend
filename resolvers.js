const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');
const { branchQueries, branchMutations } = require('./src/resolvers/branchResolvers');
const { assetQueries, assetMutations } = require('./src/resolvers/assetResolvers');

const resolvers = {
  Query: {
    ...bankQueries,
    ...branchQueries,
    ...assetQueries,
  },
  Mutation: {
    ...bankMutations,
    ...branchMutations,
    ...assetMutations,
  }
};

module.exports = resolvers;