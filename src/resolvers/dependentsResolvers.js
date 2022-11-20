const {connection} = require('../config/dbConnector');

const defaultDependents = {
  DEP_ID: 0,
  EMPLOYEE_SSN: 0,
  DEPENDENT_SSN:0,
  NAME: 'NA'
}


const dependentsQueries = {
  async getAllDependents() {
    let res = [defaultDependents]
    await connection.promise().query('select * from dependents').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getDependentDetails(_, args) {
    let res = defaultDependents;
    await connection.promise().query(`select * from dependents where DEP_ID = '${args.dep_id}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const dependentsMutations = {
  async createDependents(_, args) {
    let res = 'No Data';
    // await connection.promise().query('SELECT DEP_ID FROM DEPENDENTS ORDER BY DEP_ID DESC LIMIT 1').then(([rows, fields]) => {
    //   val = rows[0]
    // });

    // if(val)
    // {
    //   dep_id=val["DEP_ID"]+1
    // }
    // else
    // {
    //   dep_id=300600
    // }
    await connection.promise().query(`insert into dependents values("1","${args.dependents.EMPLOYEE_SSN}","${args.dependents.DEPENDENT_SSN}" ,"${args.dependents.NAME}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },

  async deleteDependents(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from dependents where DEP_ID="${args.dep_id}"`).then((result, err) => {
      if (result) {
        res = 'Data Deleted successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateDependents(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`update dependents set EMPLOYEE_SSN="${args.dependents.EMPLOYEE_SSN}",DEPENDENT_SSN="${args.dependents.DEPENDENT_SSN}",NAME="${args.dependents.NAME}" where DEP_ID="${args.dependents.DEP_ID}"`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to Update data';
      }
    });
    return res;
  },

};

module.exports = { dependentsQueries, dependentsMutations };