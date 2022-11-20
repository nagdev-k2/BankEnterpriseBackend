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
    await connection.promise().query('select * from employee').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getEmployeeDetails(_, args) {
    let res = defaultEmployee;
    await connection.promise().query(`select * from employee where SSN = '${args.SSN}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const employeeMutations = {
  async createEmployee(_, args) {
    let res = 'No Data';
    const { SSN, BRANCH_ID, NAME, TELEPHONE, ROLE, MANAGER_SSN, START_DATE  } = args.employee;
    let start_date=new Date(START_DATE)
    let curr_date=new Date()
    let experience=curr_date.getFullYear()-start_date.getFullYear()
    await connection.promise().query(`insert into Employee values("${SSN}", "${BRANCH_ID}" , "${NAME}", "${TELEPHONE}", "${ROLE}", "${START_DATE}", "${MANAGER_SSN}","${experience}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  async deleteEmployee(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from employee where SSN=${args.employee_ssn}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateEmployee(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`update employee set NAME=${args.employee.NAME},TELEPHONE=${args.employee.TELEPHONE},ROLE=${args.employee.ROLE},START_DATE=${args.employee.START_DATE} where SSN=${args.employee.SSN}`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to Update data';
      }
    });
    return res;
  },
};

module.exports = { employeeQueries, employeeMutations };