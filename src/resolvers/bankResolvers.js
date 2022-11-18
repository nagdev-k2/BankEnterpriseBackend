const {connection} = require('../config/dbConnector');

const defaultBank = {
  BANK_ID: 'NA',
  BANK_NAME: 'NA',
};

const bankQueries = {
  async getAllBanks() {
    let res = [defaultBank];
    await connection.promise().query('select * from bank').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getBankDetails(_, args) {
    let res = defaultBank;
    await connection.promise().query(`select * from bank where BANK_ID = '${args.bankId}'`).then(([rows, fields]) => {
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
  async deleteBank(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from bank where BANK_ID=${args.bank_id}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },async updateBank(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`Update bank set BANK_NAME=${args.bank.BANK_NAME} where BANK_ID=${args.bank.BANK_ID}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },

};

module.exports = { bankQueries, bankMutations };