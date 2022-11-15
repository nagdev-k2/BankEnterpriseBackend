const {connection} = require('../config/dbConnector');

const bankResolvers = {
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

module.exports = { bankResolvers };