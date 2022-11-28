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
    await connection.promise().query(`select * from loan_payments where  TRANS_ID="${args.trans_id}"`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const loanPaymentsMutations = {
  async createLoanPayments(_, args) {
    let res = 'No Data';
    // await connection.promise().query('SELECT TRANS_ID FROM loan_payments ORDER BY TRANS_ID DESC LIMIT 1').then(([rows, fields]) => {
    //   val = rows[0]
    // });

    // if(val)
    // {
    //   trans_id=val["TRANS_ID"]+1
    // }
    // else
    // {
    //   trans_id=200400
    // }
    
    await connection.promise().query(`insert into loan_payments values("0","${args.loan_payments.LOAN_NO}","${args.loan_payments.DATE}","${args.loan_payments.AMOUNT}")`).then((result, err) => {
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