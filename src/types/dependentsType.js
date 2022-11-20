const dependentsType = `
  type Dependents {
    DEP_ID:ID!
    EMPLOYEE_SSN:Int
    DEPENDENT_SSN:Int
    NAME:String
  }

  input DependentsInput {
    DEP_ID:ID
    EMPLOYEE_SSN:Int!
    DEPENDENT_SSN:Int
    NAME:String!
  }
`;

module.exports = { dependentsType };