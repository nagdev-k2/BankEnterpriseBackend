const { gql } = require('apollo-server-express');
const { assetType } = require('./src/types/assetType');
const { bankType } = require('./src/types/bankType');
const { branchType } = require('./src/types/branchType');
const { employeeType } = require('./src/types/employeeType');
const {customerType}=require("./src/types/customerType")

const typeDefs = gql`
  scalar DateTime
  ${bankType}
  ${branchType}
  ${assetType}
  ${employeeType}
  ${customerType}

  type Query {
    getAllBanks: [Bank]
    getBankDetails(bankId: ID!): Bank
    getAllBranches: [Branch]
    getBranchDetails(branchId: ID!): Branch
    getAllAssets: [Asset]
    getAssetDetails(AssetId: ID!): Asset
    getAllCustomers:[Customer]
    getCustomerDetails(ssn:ID!):Customer
  }

  type Mutation {
    createBank(bank: BankInput): String
    createBranch(branch: BranchInput): String
    createAsset(asset: AssetInput): String
    createCustomer(customer: CustomerInput):String
  }
`;

module.exports = typeDefs;