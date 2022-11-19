const {connection} = require('../config/dbConnector');

const defaultRecords = {
  ACCOUNT_NO: 0,
  DATE: 'NA',
  TYPE:'NA',
  AMOUNT: 0.0,
}


const recordsQueries = {
  async getAllRecords() {
    let res = [defaultRecords]
    await connection.promise().query('select * from records').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getRecordsDetails(_, args) {
    let res = defaultLoan;
    await connection.promise().query(`select * from records where ACCOUNT_NO = '${args.account_no}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const recordsMutations = {
  async createRecords(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into records values("${args.records.ACCOUNT_NO}","${args.records.DATE}" ,"${args.records.TYPE}","${args.records.AMOUNT}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  async deleteRecords(_, args) {
    let res = 'No Data';
    await connection.promise().query(`delete from records where ACCOUNT_NO=${args.account_no} `).then((result, err) => {
      if (result) {
        res = 'Data Deleted successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateRecords(_, args) {
    let res = 'No Data';
    await connection.promise().query(`update records set DATE=${args.records.DATE},TYPE=${args.records.TYPE},AMOUNT=${args.records.AMOUNT} where ACCOUNT_NO=${args.records.ACCOUNT_NO} `).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  
};

module.exports = { recordsQueries, recordsMutations };