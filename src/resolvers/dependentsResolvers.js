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
    await connection.promise().query(`insert into dependents("employee_ssn","dependent_ssn","name") values("${args.dependents.EMPLOYEE_SSN}","${args.dependents.DEPENDENT_SSN}" ,"${args.dependents.NAME}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { dependentsQueries, dependentsMutations };