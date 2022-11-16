const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');
const { branchQueries, branchMutations } = require('./src/resolvers/branchResolvers');
const { assetQueries, assetMutations } = require('./src/resolvers/assetResolvers');
const {customerQueries, customerMutations}=require('./src/resolvers/customerResolvers')
const {accountsQueries, accountsMutations}=require("./src/resolvers/accountsResolvers") 
const { dependentsQueries, dependentsMutations }=require("./src/resolvers/dependentsResolvers")
const resolvers = {
  Query: {
    ...bankQueries,
    ...branchQueries,
    ...assetQueries,
    ...customerQueries,
    ...accountsQueries,
    ...dependentsQueries
  },
  Mutation: {
    ...bankMutations,
    ...branchMutations,
    ...assetMutations,
    ...customerMutations,
    ...accountsMutations,
    ...dependentsMutations
  }
};

module.exports = resolvers;