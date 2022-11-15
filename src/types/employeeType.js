const employeeType = `
  type Employee {
    SSN: ID!,
    BRANCH_ID: String
    NAME: String
    TELEPHONE: Int,
    ROLE: String
    MANAGER_SSN: Int,
  }
`;

module.exports = { employeeType };