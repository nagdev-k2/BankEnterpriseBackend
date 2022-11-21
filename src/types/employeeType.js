const employeeType = `
  type Employee {
    SSN: ID!
    BRANCH_ID: String
    NAME: String
    TELEPHONE: String
    ROLE: String
    MANAGER_SSN: Int
    START_DATE: String
    LENGTH_OF_EMPLOYMENT:String
  }
  input EmployeeInput {
    SSN: ID!
    BRANCH_ID: String!
    NAME: String!
    TELEPHONE: String
    ROLE: String!
    MANAGER_SSN: Int
    START_DATE: String!
    LENGTH_OF_EMPLOYMENT:String
  }
`;

module.exports = { employeeType };