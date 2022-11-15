const { bankResolvers } = require('./src/resolvers/bankResolvers');

const resolvers = {
  Query: {
    ...bankResolvers
  },
};

module.exports = resolvers;