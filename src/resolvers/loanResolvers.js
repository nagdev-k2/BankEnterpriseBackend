const {connection} = require('../config/dbConnector');

const defaultLoan = {
  LOAN_NO: 0,
  LOAN_OFFICER_SSN: 0,
  BRANCH_ID:'NA',
  BALANCE: 0.0,
  LOAN_TYPE:'NA',
  CREDIT_LIMIT:0,
  CREDIT_RATING:0.0,
  INTEREST_RATE:0.0
}


const loanQueries = {
  async getAllLoans() {
    let res = [defaultLoan]
    await connection.promise().query('select * from loan,loan_borrowed where loan.LOAN_NO=loan_borrowed.LOAN_NO').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getLoanDetails(_, args) {
    let res = defaultLoan;
    await connection.promise().query(`select * from loan , LOAN BORROWED WHERE LOAN.LOAN_NO = LOAN_BORROWED.LOAN_NO AND LOAN_NO = '${args.loan_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const loanMutations = {
  async createLoan(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into loan values( "0","${args.loans.LOAN_OFFICER_SSN}" ,"${args.loans.BRANCH_ID}","${args.loans.AMOUNT}","${args.loans.LOAN_TYPE}","${args.loans.CREDIT_LIMIT}","${args.loans.CREDIT_RATING}","${args.loans.INTEREST_RATE}" ) ` ).then(async (result, err) => {
      if (result) {
        await connection.promise().query('SELECT LOAN_NO FROM LOAN ORDER BY LOAN_NO DESC LIMIT 1').then(async ([rows, fields]) => {
          await connection.promise().query(`INSERT INTO LOAN_BORROWED VALUES ("0", ${rows[0].LOAN_NO}, ${args.loans.CUSTOMER_SSN})`).then(([rows, fields]) => {
            res = 'Data inserted successfully';
          });
        });
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  
  },

  async deleteLoan(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from loan where LOAN_NO="${args.loan_no}"`).then((result, err) => {
      if (result) {
        res = 'Data Deleted successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateLoan(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`update loan set AMOUNT="${args.loan.BALANCE}",LOAN_TYPE="${args.loan.LOAN_TYPE}",CREDIT_LIMIT="${args.loan.CREDIT_LIMIT}",CREDIT_RATING="${args.loan.CREDIT_RATING}",INTEREST_RATE="${args.loan.INTEREST_RATE}" where LOAN_NO="${args.loan.LOAN_NO}"`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to Update data';
      }
    });
    return res;
  },
  
};

module.exports = { loanQueries, loanMutations };