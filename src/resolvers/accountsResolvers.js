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
    let res = [defaultAccounts]
    await connection.promise().query('select * from Accounts').then(([rows, fields]) => {
      res = rows
    });
    
    return res;
  },
  async getAccountDetails(_, args) {
    let res = defaultAccounts;
    console.log(args.account_no);
    await connection.promise().query(`select * from Accounts where ACCOUNT_NO = ${args.account_no}`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const accountsMutations = {
  async createAccounts(_, args) {
    let res = 'No Data';    
    // await connection.promise().query('SELECT ACCOUNT_NO FROM ACCOUNTS ORDER BY ACCOUNT_NO DESC LIMIT 1').then(([rows, fields]) => {
    //   val = rows[0]
    // });
    // if(val)
    // {
    //   acc_no=val["ACCOUNT_NO"]+1
    // }
    // else
    // {
    //   acc_no=1000
    // }
    let date=new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let curr=`${year}-${month}-${day}`;

    await connection.promise().query(`insert into Accounts values("1", "${args.accounts.BRANCH_ID}", "${args.accounts.BALANCE}", "${curr}", "${args.accounts.TYPE}", "${args.accounts.INTEREST_RATE}", "${args.accounts.OVERDRAFTS}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  async deleteAccounts(_, args) {
    let res = 'No Data';    
    console.log(args.accounts);
    await connection.promise().query(`delete from Accounts where ACCOUNT_ID=${args.account_no}`).then((result, err) => {
      if (result) {
        res = 'Data Deleted successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateAccounts(_, args) {
    let res = 'No Data';    
    let date=new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let curr=`${year}-${month}-${day}`;
    await connection.promise().query(`update Accounts set RECENT_ACCESS_DATE= "${curr}",TYPE="${args.accounts.TYPE}",INTEREST_RATE="${args.accounts.INTEREST_RATE}",OVERDRAFTS="${args.accounts.OVERDRAFTS}"  where ACCOUNT_NO="${args.accounts.ACCOUNT_NO}"`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to Update data';
      }
    });
    return res;
  },
};

module.exports = { accountsQueries, accountsMutations };