const {connection} = require('../config/dbConnector');

const defaultCustomerAccounts = {
  ACCOUNT_NO: 0,
  CUSTOMER_SSN: 0
}


const customerAccountsQueries = {
  async getAllCustomerAccounts() {
    let res = [defaultCustomerAccounts]
    await connection.promise().query('select * from customer_accounts').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getCustomerAccountsDetails(_, args) {
    let res = defaultCustomerAccounts;
    await connection.promise().query(`select * from customer_accounts where ACCOUNT_NO = '${args.account_no}' and CUSTOMER_SSN='${args.customer_ssn}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const customerAccountsMutations = {
  async createCustomerAccounts(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into records values("${args.customer_accounts.ACCOUNT_NO}","${args.customer_accounts.CUSTOMER_SSN}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { customerAccountsQueries, customerAccountsMutations };