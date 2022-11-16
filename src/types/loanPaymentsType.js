const loanPaymentsType = `
  type LoanPayments {
    LOAN_NO: ID!
    DATE: String
    AMOUNT:Float

  }

  input LoanPaymentsInput
  {
    LOAN_NO: ID!
    DATE: String!
    AMOUNT:Float!

  }
`;

module.exports = { loanPaymentsType };