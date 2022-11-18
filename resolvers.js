const { bankQueries, bankMutations } = require('./src/resolvers/bankResolvers');
const { branchQueries, branchMutations } = require('./src/resolvers/branchResolvers');
const { assetQueries, assetMutations } = require('./src/resolvers/assetResolvers');
const {customerQueries, customerMutations}=require('./src/resolvers/customerResolvers')
const {accountsQueries, accountsMutations}=require("./src/resolvers/accountsResolvers") 
const { dependentsQueries, dependentsMutations }=require("./src/resolvers/dependentsResolvers")
const { loanQueries, loanMutations }=require("./src/resolvers/loanResolvers")
const {loanBorrowedQueries, loanBorrowedMutations}=require("./src/resolvers/loanBorrowedResolver")
const { loanPaymentsQueries, loanPaymentsMutations }=require("./src/resolvers/loanPaymentsResolver")
const { recordsQueries, recordsMutations }=require("./src/resolvers/recordsResolver")
const { customerAccountsQueries, customerAccountsMutations }=require("./src/resolvers/customerAccountsResolver")
const { employeeQueries, employeeMutations } = require('./src/resolvers/employeeResolvers');

const resolvers = {
  Query: {
    ...bankQueries,
    ...branchQueries,
    ...assetQueries,
    ...customerQueries,
    ...accountsQueries,
    ...dependentsQueries,
    ...loanQueries,
    ...loanBorrowedQueries,
    ...loanPaymentsQueries,
    ...recordsQueries,
    ...customerAccountsQueries
    ...employeeQueries,
  },
  Mutation: {
    ...bankMutations,
    ...branchMutations,
    ...assetMutations,
    ...customerMutations,
    ...accountsMutations,
    ...dependentsMutations,
    ...loanMutations,
    ...loanBorrowedMutations,
    ...loanPaymentsMutations,
    ...recordsMutations,
    ...customerAccountsMutations,
    ...employeeMutations,
  }
};

module.exports = resolvers;