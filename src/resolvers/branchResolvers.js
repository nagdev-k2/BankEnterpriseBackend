const {connection} = require('../config/dbConnector');

const defaultBranch = {
  BRANCH_ID: 'NA',
  BANK_ID: 'NA',
  BRANCH_NAME: 'NA',
  CITY: 'NA',
}


const branchQueries = {
  async getAllBranches() {
    let res = [defaultBranch]
    await connection.promise().query('select * from branch').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getBranchDetails(_, args) {
    let res = defaultBranch;
    await connection.promise().query(`select * from branch where BRANCH_ID = '${args.branchId}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const branchMutations = {
  async createBranch(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into branch values("${args.branch.BRANCH_ID}", "${args.branch.BANK_ID}", "${args.branch.BRANCH_NAME}", "${args.branch.CITY}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { branchQueries, branchMutations };