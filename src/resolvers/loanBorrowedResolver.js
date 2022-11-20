const {connection} = require('../config/dbConnector');

const defaultLoanBorrowed = {
  LOAN_NO: 0,
  CUSTOMER_SSN: 0,
}
const defaultLoan={
  LOAN_NO: 0,
  LOAN_OFFICER_SSN: 0,
  BRANCH_ID:'NA',
  AMOUNT: 0.0,
  LOAN_TYPE:'NA',
  CREDIT_LIMIT:0,
  CREDIT_RATING:0.0,
  INTEREST_RATE:0.0
}

const defaultLoanBorrowedbycust={
  ...defaultLoanBorrowed,
  ...defaultLoan

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
  async getLoanBorrowedDetailsByCustomer(_,args){
    let res=[defaultLoanBorrowedbycust]
    await connection.promise().query(`select loan_no from loan_borrowed where CUSTOMER_SSN = '${args.customer_ssn}'`).then(([rows, fields]) => {
      res = rows
    });
    return res
  },
};

const loanBorrowedMutations = {
  async createLoanBorrowed(_, args) {
    let res = 'No Data';
    await connection.promise().query('SELECT * FROM LOAN_BORROWED,LOAN where LOAN.LOAN_NO=LOAN_BORROWED.LOAN_NO').then(([rows, fields]) => {
      check = rows
    });
    if(check.length>1)
    {
      res="Customer has already has Two Loans"
    }
    else
    {
    await connection.promise().query(`insert into loan_borrowed values("1","${args.loan_borrowed.LOAN_NO}","${args.loan_borrowed.CUSTOMER_SSN}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
  }
    return res;
  },
};

module.exports = { loanBorrowedQueries, loanBorrowedMutations };