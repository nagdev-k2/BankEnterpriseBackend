const employeeType = `
  type Employee {
    SSN: ID!
    BRANCH_ID: String
    NAME: String
    TELEPHONE: String
    ROLE: String
    MANAGER_SSN: Int
    START_DATE: String
    LENGTH_OF_EMPLOYMENT:Int
  }
  input EmployeeInput {
    SSN: ID!
    BRANCH_ID: String!
    NAME: String!
    TELEPHONE: String
    ROLE: String!
    MANAGER_SSN: Int
    START_DATE: String!
    LENGTH_OF_EMPLOYMENT:Int
  }
`;

module.exports = { employeeType };