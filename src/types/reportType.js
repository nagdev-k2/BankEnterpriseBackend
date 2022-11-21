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
    WEEK_START_DATE:String
    LOAN_OFFICER_SSN:Int
    NO_OF_LOANS_HANDLED:Int
    LOAN_TYPE:String
    AMOUNT_DEPOSITED:Float
  }
`;
module.exports = { reportType };