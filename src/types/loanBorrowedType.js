const loanBorrowedType = `
  type LoanBorrowed {
    LOAN_NO: ID!,
    CUSTOMER_SSN: Int
  }

  input LoanBorrowedInput
  {
    LOAN_NO: ID!,
    CUSTOMER_SSN: Int!
  }
`;

module.exports = { loanBorrowedType };