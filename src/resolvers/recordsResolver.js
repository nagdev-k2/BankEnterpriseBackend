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
    await connection.promise().query('SELECT RECORD_NO FROM RECORDS ORDER BY RECORD_NO DESC LIMIT 1').then(([rows, fields]) => {
      val = rows[0]
    });
    if(val)
    {
      res = val['RECORD_NO'].split('_')
      record_no = `${res[0]}_0${(parseInt(res[1])+1)}`
    }
    else
    {
      record_no="REC_01"
    }

    await connection.promise().query(`insert into records values("${record_no}","${args.records.ACCOUNT_NO}","${args.records.DATE}" ,"${args.records.TYPE}","${args.records.AMOUNT}")`).then((result, err) => {
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