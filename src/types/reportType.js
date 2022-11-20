const reportType = `
  type BranchReport {
    BRANCH_ID: ID!
    TOTAL_LOANS: Int
    OUTSTANDING_BALANCE: Int
    TOTAL_ACCOUNTS: Int
    TOTAL_BALANCE: Int
  }

  type WeeklyReport {
    BRANCH_ID: ID!
    EMPLOYEE_SSN: Int
  }
`;
module.exports = { reportType };