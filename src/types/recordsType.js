const recordsType = `
  type Records {
    RECORD_NO:ID!
    ACCOUNT_NO: ID!
    DATE: String
    TYPE: String
    AMOUNT: Float
  }

  input RecordsInput {
    ACCOUNT_NO: ID!
    DATE: String
    TYPE: String!
    AMOUNT: Float!
  }

`;
module.exports = { recordsType };