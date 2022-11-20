const accountsType = `
  type Accounts {
    ACCOUNT_NO: ID!
    BRANCH_ID: String
    CUSTOMER_SSN: Int
    BALANCE: Float
    RECENT_ACCESS_DATE: String
    TYPE: String
    INTEREST_RATE: Float
    OVERDRAFTS: Int
  }

  input AccountsInput {
    ACCOUNT_NO:ID
    BRANCH_ID: String!
    CUSTOMER_SSN: Int
    BALANCE: Float
    TYPE: String!
    INTEREST_RATE: Float
    RECENT_ACCESS_DATE:String
    OVERDRAFTS: Int
  }
`;

module.exports = { accountsType };