const {connection} = require('../config/dbConnector');

const defaultAccounts = {
  ACCOUNT_NO: 0,
  BRANCH_ID: 'NA',
  BALANCE: 0.0,
  RECENT_ACCESS_DATE: 'NA',
  TYPE: 'NA',
  INTEREST_RATE: 0.00,
  OVERDRAFTS: 0
}


const accountsQueries = {
  async getAllAccounts() {
    createAccountId()
    let res = [defaultAccounts]
    await connection.promise().query('select * from Accounts').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getAccountDetails(_, args) {
    let res = defaultAccounts;
    await connection.promise().query(`select * from Accounts where ACCOUNT_NO = '${args.account_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const createAccountId = async () => {
  let time = new Date()
  return time.getTime();
}

const accountsMutations = {
  async createAccounts(_, args) {
    let res = 'No Data';    
    console.log(args.accounts);
    await connection.promise().query(`insert into Accounts values("${createAccountId()}", "${args.accounts.BRANCH_ID}", "${args.accounts.BALANCE}", "${args.accounts.RECENT_ACCESS_DATE}", "${args.accounts.TYPE}", "${args.accounts.INTEREST_RATE}", "${args.accounts.OVERDRAFTS}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { accountsQueries, accountsMutations };