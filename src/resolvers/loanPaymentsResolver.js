const {connection} = require('../config/dbConnector');

const defaultLoanPayments = {
  LOAN_NO: 0,
  DATE: 'NA',
  AMOUNT:0.0
}


const loanPaymentsQueries = {
  async getAllLoanPayments() {
    let res = [defaultLoanPayments]
    await connection.promise().query('select * from loan_payments').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getLoanPaymentsDetails(_, args) {
    let res = defaultLoanPayments;
    await connection.promise().query(`select * from loan_payments where LOAN_NO = '${args.loan_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const loanPaymentsMutations = {
  async createLoanPayments(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into loan_payments values("${args.loan_payments.LOAN_NO}","${args.loan_payments.DATE}","${args.loan_payments.AMOUNT}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { loanPaymentsQueries, loanPaymentsMutations };