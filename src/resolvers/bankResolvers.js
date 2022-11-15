const {connection} = require('../config/dbConnector');

const bankQueries = {
  async getAllBanks() {
    let res = [{BANK_ID: 'NA', BANK_NAME: 'NA'}]
    await connection.promise().query('select * from bank').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getBankDetails(_, args) {
    let res = {BANK_ID: 'NA', BANK_NAME: 'NA'}
    await connection.promise().query(`select * from bank where BANK_ID = '${args.bankId}'`).then(([rows, fields]) => {
      console.log(rows);
      res = rows[0]
    });
    return res;
  },
};

const bankMutations = {
  async createBank(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into bank values("${args.bank.BANK_ID}", "${args.bank.BANK_NAME}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { bankQueries, bankMutations };