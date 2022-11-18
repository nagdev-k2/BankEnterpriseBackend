const {connection} = require('../config/dbConnector');

const defaultCustomer = {
  SSN: 0,
  NAME: 'NA',
  STREET: 'NA',
  CITY: 'NA',
  ASSOCIATED_EMPLOYEE_SSN:0,
  ASSOCIATED_EMPLOYEE_TYPE:0,
}


const customerQueries = {
  async getAllCustomers() {
    let res = [defaultCustomer]
    await connection.promise().query('select * from customer').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getCustomerDetails(_, args) {
    let res = defaultCustomer;
    await connection.promise().query(`select * from customer where SSN = '${args.ssn}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const customerMutations = {
  async createCustomer(_, args) {
    let res = 'No Data';
    await connection.promise().query(`insert into customer values("${args.customer.SSN}", "${args.customer.NAME}", "${args.customer.STREET}", "${args.customer.CITY}","${args.customer.ASSOCIATED_EMPLOYEE_SSN}","${args.customer.ASSOCIATED_EMPLOYEE_TYPE}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  async deleteCustomer(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from customer where SSN=${args.customer_ssn}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
};

module.exports = { customerQueries, customerMutations };