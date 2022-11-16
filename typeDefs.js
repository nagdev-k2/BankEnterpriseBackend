const { gql } = require('apollo-server-express');
const { assetType } = require('./src/types/assetType');
const { bankType } = require('./src/types/bankType');
const { branchType } = require('./src/types/branchType');
const { employeeType } = require('./src/types/employeeType');
const {customerType}=require("./src/types/customerType")
const {accountsType}=require("./src/types/accountsType")
const {dependentsType}=require("./src/types/dependentsType")
const {loanType}=require("./src/types/loanType")
const {loanBorrowedType}=require("./src/types/loanBorrowedType")
const {loanPaymentsType}=require("./src/types/loanPaymentsType")
const {recordsType}=require("./src/types/recordsType")
const { customerAccountsType }=require("./src/types/customerAccountsType")



const typeDefs = gql`
  scalar DateTime
  ${bankType}
  ${branchType}
  ${assetType}
  ${employeeType}
  ${customerType}
  ${accountsType}
  ${dependentsType}
  ${loanType}
  ${loanBorrowedType}
  ${loanPaymentsType}
  ${recordsType}
  ${customerAccountsType}

  type Query {
    getAllBanks: [Bank]
    getBankDetails(bankId: ID!): Bank
    getAllBranches: [Branch]
    getBranchDetails(branchId: ID!): Branch
    getAllAssets: [Asset]
    getAssetDetails(AssetId: ID!): Asset
    getAllCustomers:[Customer]
    getCustomerDetails(ssn:ID!):Customer
    getAllAccounts: [Accounts]
    getAccountDetails(account_no: ID!):Accounts
    getAllDependents:[Dependents]
    getDependentDetails(dep_id:ID!):Dependents
    getAllLoans:[Loan]
    getLoanDetails(loan_no:ID!):Loan
    getAllLoansBorrowed:[LoanBorrowed]
    getLoanBorrowedDetails(loan_no:ID!):LoanBorrowed
    getAllLoanPayments:[LoanPayments]
    getLoanPaymentsDetails(loan_no:ID!):LoanPayments
    getAllRecords:[Records]
    getRecordsDetails(account_no:ID!):Records
    getAllCustomerAccounts:[CustomerAccounts]
    getCustomerAccountsDetails(account_no:ID!,customer_ssn:ID!):CustomerAccounts
    getAllEmployees: [Employee]
    getEmployeeDetails: Employee
  }

  type Mutation {
    createBank(bank: BankInput): String
    createBranch(branch: BranchInput): String
    createAsset(asset: AssetInput): String
    createCustomer(customer: CustomerInput):String
    createAccounts(accounts:AccountsInput):String
    createDependents(dependents:DependentsInput):String
    createLoan(loan:LoanInput):String
    createLoanBorrowed(loan_borrowed:LoanBorrowedInput):String
    createLoanPayments(loan_payments:LoanPaymentsInput):String
    createRecords(records:RecordsInput):String
    createCustomerAccounts(customer_accounts:CustomerAccountsInput):String
    createEmployee(employee: EmployeeInput): String
  }
`;

module.exports = typeDefs;