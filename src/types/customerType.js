const customerType = `
  type Customer {
    SSN: ID!
    NAME: String
    STREET: String
    CITY: String
    ASSOCIATED_EMPLOYEE_SSN: Int
    ASSOCIATED_EMPLOYEE_TYPE: String
  }

  input CustomerInput {
    SSN: ID!
    NAME: String!
    STREET: String!
    CITY: String!
    ASSOCIATED_EMPLOYEE_SSN: Int
    ASSOCIATED_EMPLOYEE_TYPE: String
  }

`;
module.exports = { customerType };