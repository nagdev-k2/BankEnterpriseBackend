const loanPaymentsType = `
  type LoanPayments {
    TRANS_ID:ID!
    LOAN_NO: ID!
    DATE: String
    AMOUNT:Float

  }

  input LoanPaymentsInput
  {
    LOAN_NO: ID!
    DATE: String
    AMOUNT:Float

  }
`;

module.exports = { loanPaymentsType };