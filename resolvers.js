const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');

const resolvers = {
  Query: {
    ...bankQueries
  },
  Mutation: {
    ...bankMutations
  }
};

module.exports = resolvers;