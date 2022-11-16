const {connection} = require('../config/dbConnector');

const defaultLoanBorrowed = {
  LOAN_NO: 0,
  CUSTOMER_SSN: 0,
}


const loanBorrowedQueries = {
  async getAllLoansBorrowed() {
    let res = [defaultLoanBorrowed]
    await connection.promise().query('select * from loan_borrowed').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getLoanBorrowedDetails(_, args) {
    let res = defaultLoanBorrowed;
    await connection.promise().query(`select * from loan_borrowed where LOAN_NO = '${args.loan_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const loanBorrowedMutations = {
  async createLoanBorrowed(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into loan_borrowed values("${args.loan_borrowed.LOAN_NO}","${args.loan_borrowed.CUSTOMER_SSN}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { loanBorrowedQueries, loanBorrowedMutations };