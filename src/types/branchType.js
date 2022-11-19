const branchType = `
  type Branch {
    BRANCH_ID: ID!
    BANK_ID: String
    BRANCH_NAME: String
    CITY: String
  }

  input BranchInput {
    BANK_ID: String!
    BRANCH_NAME: String!
    CITY: String!
  }

`;
module.exports = { branchType };