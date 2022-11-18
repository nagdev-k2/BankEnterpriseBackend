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
    await connection.promise().query(`insert into loan values( "${args.loans.LOAN_NO}","${args.loans.LOAN_OFFICER_SSN}" ,"${args.loans.BRANCH_ID}","${args.loans.AMOUNT}","${args.loans.LOAN_TYPE},"${args.loans.CREDIT_LIMIT}","${args.loans.CREDIT_RATING}","${args.loans.INTEREST_RATE}" ) ` ).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },

  async deleteLoan(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from loan where LOAN_ID=${args.loan_id}`).then((result, err) => {
      if (result) {
        res = 'Data Deleted successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
};

module.exports = { loanQueries, loanMutations };