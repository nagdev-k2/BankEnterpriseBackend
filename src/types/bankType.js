const bankType = `
  type Bank {
    BANK_ID: ID!
    BANK_NAME: String
  }
  input BankInput {
    BANK_ID: ID!
    BANK_NAME: String!
  }
`;
module.exports = { bankType };