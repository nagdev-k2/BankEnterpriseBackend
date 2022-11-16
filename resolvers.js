const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');
const { branchQueries, branchMutations } = require('./src/resolvers/branchResolvers');
const { assetQueries, assetMutations } = require('./src/resolvers/assetResolvers');
const {customerQueries, customerMutations}=require('./src/resolvers/customerResolvers')
const resolvers = {
  Query: {
    ...bankQueries,
    ...branchQueries,
    ...assetQueries,
    ...customerQueries
  },
  Mutation: {
    ...bankMutations,
    ...branchMutations,
    ...assetMutations,
    ...customerMutations
  }
};

module.exports = resolvers;