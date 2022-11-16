const employeeType = `
  type Employee {
    SSN: ID!
    BRANCH_ID: String
    NAME: String
    TELEPHONE: String
    ROLE: String
    MANAGER_SSN: Int
    START_DATE: String
  }

  input EmployeeInput {
    SSN: ID!
    BRANCH_ID: String!
    NAME: String!
    TELEPHONE: String
    ROLE: String!
    MANAGER_SSN: Int
    START_DATE: String!
  }
`;

module.exports = { employeeType };