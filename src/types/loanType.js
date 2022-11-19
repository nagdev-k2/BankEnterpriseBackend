const loanType = `
  type Loan {
    LOAN_NO: ID!
    LOAN_OFFICER_SSN: Int
    BRANCH_ID: String
    AMOUNT: Float
    LOAN_TYPE: String
    CREDIT_LIMIT: Int
    CREDIT_RATING:Float
    INTEREST_RATE:Float
  }

  input LoanInput {
    LOAN_OFFICER_SSN: Int!
    BRANCH_ID: String!
    AMOUNT: Float!
    LOAN_TYPE: String!
    CREDIT_LIMIT: Int!
    CREDIT_RATING:Float!
    INTEREST_RATE:Float!
  }

`;
module.exports = { loanType };