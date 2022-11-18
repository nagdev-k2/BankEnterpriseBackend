const {connection} = require('../config/dbConnector');

const defaultLoan = {
  LOAN_NO: 0,
  LOAN_OFFICER_SSN: 0,
  BRANCH_ID:'NA',
  AMOUNT: 0.0,
  LOAN_TYPE:'NA',
  CREDIT_LIMIT:0,
  CREDIT_RATING:0.0,
  INTEREST_RATE:0.0
}


const loanQueries = {
  async getAllLoans() {
    let res = [defaultLoan]
    await connection.promise().query('select * from loan').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getLoanDetails(_, args) {
    let res = defaultLoan;
    await connection.promise().query(`select * from loan where LOAN_NO = '${args.loan_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const loanMutations = {
  async createLoan(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into loan values("${args.loan.LOAN_NO}","${args.loan.LOAN_OFFICER_SSN}" ,"${args.loan.BRANCH_ID}","${args.loan.AMOUNT}","${args.loan.LOAN_TYPE},"${args.loan.CREDIT_LIMIT}","${args.loan.CREDIT_RATING}","${args.loan.INTEREST_RATE}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { loanQueries, loanMutations };