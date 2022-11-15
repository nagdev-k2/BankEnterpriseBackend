const { gql } = require('apollo-server-express');
const { assetType } = require('./src/types/assetType');
const { bankType } = require('./src/types/bankType');
const { branchType } = require('./src/types/branchType');
const { employeeType } = require('./src/types/employeeType');

const typeDefs = gql`
  ${bankType}
  ${branchType}
  ${assetType}
  ${employeeType}

  type Query {
    getAllBanks: [Bank]
    getBankDetails(bankId: ID!): Bank
  }
`;

module.exports = typeDefs;