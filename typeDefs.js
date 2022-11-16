const { gql } = require('apollo-server-express');
const { assetType } = require('./src/types/assetType');
const { bankType } = require('./src/types/bankType');
const { branchType } = require('./src/types/branchType');
const { employeeType } = require('./src/types/employeeType');

const typeDefs = gql`
  scalar DateTime
  ${bankType}
  ${branchType}
  ${assetType}
  ${employeeType}

  type Query {
    getAllBanks: [Bank]
    getBankDetails(bankId: ID!): Bank
    getAllBranches: [Branch]
    getBranchDetails(branchId: ID!): Branch
    getAllAssets: [Asset]
    getAssetDetails: Asset
  }

  type Mutation {
    createBank(bank: BankInput): String
    createBranch(branch: BranchInput): String
    createAsset(asset: AssetInput): String
  }
`;

module.exports = typeDefs;