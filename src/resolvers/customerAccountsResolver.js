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
    await connection.promise().query(`select * from customer_accounts where UIN = '${args.uin}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const customerAccountsMutations = {
  async createCustomerAccounts(_, args) {
    let res = 'No Data';
    await connection.promise().query('SELECT UIN FROM customer_accounts ORDER BY UIN DESC LIMIT 1').then(([rows, fields]) => {
      val = rows[0]
    });

    if(val)
    {
      uin= val["UIN"]+1
    }
    else
    {
      uin=333333333
    }
    
    await connection.promise().query(`insert into customer_accounts values("${args.customer_accounts.ACCOUNT_NO}","${args.customer_accounts.CUSTOMER_SSN}","${uin}")`).then((result, err) => {
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