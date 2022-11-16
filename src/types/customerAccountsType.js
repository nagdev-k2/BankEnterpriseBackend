const customerAccountsType = `
  type CustomerAccounts {
    ACCOUNT_NO: ID!
    CUSTOMER_SSN: ID!
  }

  input CustomerAccountsInput {
    ACCOUNT_NO: ID!
    CUSTOMER_SSN:ID!
  }

`;
module.exports = { customerAccountsType };