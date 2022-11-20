const loanBorrowedType = `
  type LoanBorrowed {
    BORROWER_ID:ID!
    LOAN_NO: Int
    CUSTOMER_SSN: Int
  }

  input LoanBorrowedInput
  {
    BORROWER_ID:Int
    LOAN_NO: Int!
    CUSTOMER_SSN: Int!
  }
`;

module.exports = { loanBorrowedType };