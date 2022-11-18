const {connection} = require('../config/dbConnector');

const defaultBank = {
  BANK_ID: 'NA',
  BANK_NAME: 'NA',
};

const bankQueries = {
  async getAllBanks() {
    let res = [defaultBank];
    createBankId();
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

const createBankId = async () => {
  let res = [defaultBank];
    await connection.promise().query('SELECT BANK_ID FROM Bank ORDER BY BANK_ID DESC LIMIT 1').then(([rows, fields]) => {
      res = rows[0]
    });
    res = res['BANK_ID'].split('_')
    res = `${res[0]}_0${(parseInt(res[1])+1)}`
    return res;
}

const bankMutations = {
  async createBank(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into bank values("${createBankId()}", "${args.bank.BANK_NAME}")`).then((result, err) => {
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