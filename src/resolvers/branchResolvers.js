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

const createBranchId = async (city) => {
  let res = [defaultBranch];
    await connection.promise().query('SELECT BRANCH_ID FROM Branch ORDER BY BRANCH_ID DESC LIMIT 1').then(([rows, fields]) => {
      res = rows[0]
    });
    res = res['BRANCH_ID'].split('_')
    res = `${res[0]}_${city.substring(0,4)}_0${(parseInt(res[2])+1)}`
    console.log(res);
    return res;
}

const branchMutations = {
  async createBranch(_, args) {
    let res = 'No Data';
    await connection.promise().query(`SELECT BRANCH_ID FROM Branch where City= "${args.branch.CITY}" and Bank_id="${args.branch.BANK_ID}"  ORDER BY BRANCH_ID DESC LIMIT 1`).then(([rows, fields]) => {
      val = rows[0]
    });

    if(val)
    {
      res="City Already Present"
    }
    else
    {
      await connection.promise().query(`SELECT BRANCH_ID,BANK_ID FROM Branch ORDER BY BRANCH_ID DESC LIMIT 1`).then(([rows, fields]) => {
        val = rows[0]
      });
      if(val)
      {
        res = val['BRANCH_ID'].split('_')
        branch_id = `BR_${val["BANK_ID"]}_${args.branch.CITY.substring(0,4)}_0${(parseInt(res[(res.length)-1])+1)}`
      }
      else
      {
        branch_id="BR_01"
      }
      
      await connection.promise().query(`insert into branch values("${branch_id}", "${args.branch.BANK_ID}", "${args.branch.BRANCH_NAME}", "${args.branch.CITY}")`).then((result, err) => {
        if (result) {
          res = 'Data inserted successfully';
        } else {
          res = 'Failed to insert data';
        }
      });

    }
    return res;
  },
  async deleteBranch(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from branch where BRANCH_ID="${args.branch_id}"`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateBranch(_, args) {
    let res = 'No Data';
    await connection.promise().query(`update branch set BRANCH_NAME="${args.branch.BRANCH_NAME}",CITY="${args.branch.CITY}" where BRANCH_ID="${args.branch.BRANCH_ID}"`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { branchQueries, branchMutations };