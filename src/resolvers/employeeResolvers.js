const {connection} = require('../config/dbConnector');

const defaultEmployee = {
  SSN: '000-00-0000',
  BRANCH_ID: 'NA',
  NAME: 'NA',
  TELEPHONE: '000-000-0000',
  ROLE: 'NA',
  MANAGER_SSN: '000-00-0000',
  START_DATE: 'NA'
}

const employeeQueries = {
  async getAllEmployees() {
    let res = [defaultEmployee]
    await connection.promise().query('select * from Employees').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getEmployeeDetails(_, args) {
    let res = defaultEmployee;
    await connection.promise().query(`select * from Employees where SSN = '${args.SSN}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const employeeMutations = {
  async createEmployee(_, args) {
    let res = 'No Data';
    const { SSN, BRANCH_ID, NAME, TELEPHONE, ROLE, MANAGER_SSN, START_DATE  } = args.employee;
    await connection.promise().query(`insert into Employees values("${SSN}", "${BRANCH_ID}" , "${NAME}", "${TELEPHONE}", "${ROLE}", "${START_DATE}", "${MANAGER_SSN}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { employeeQueries, employeeMutations };