const {connection} = require('../config/dbConnector');

const reportQueries = {
  async getBranchReport() {
    let res = []
    await connection.promise().query('select BRANCH_ID from BRANCH').then(async([rows, fields]) => {
      for(let i = 0; i < rows.length; i++) {
        await connection.promise().query(`SELECT
          ACCOUNT_DETAILS.BRANCH_ID, COUNT(LOAN.LOAN_NO) AS TOTAL_LOANS,
          SUM(LOAN.BALANCE) - COALESCE(SUM(LOAN_PAYMENTS.AMOUNT), 0) AS OUTSTANDING_BALANCE,
          ACCOUNT_DETAILS.TOTAL_ACCOUNTS, ACCOUNT_DETAILS.TOTAL_BALANCE
          FROM
          (
            SELECT BRANCH_ID, COUNT(ACCOUNT_NO) AS TOTAL_ACCOUNTS, SUM(BALANCE) AS TOTAL_BALANCE
              FROM ACCOUNTS WHERE BRANCH_ID = "${rows[i].BRANCH_ID}" GROUP BY BRANCH_ID
          ) AS ACCOUNT_DETAILS,
          LOAN
          LEFT JOIN LOAN_PAYMENTS ON LOAN.LOAN_NO = LOAN_PAYMENTS.LOAN_NO
          WHERE LOAN.BRANCH_ID = ACCOUNT_DETAILS.BRANCH_ID AND LOAN.BRANCH_ID = '${rows[i].BRANCH_ID}' GROUP BY LOAN.BRANCH_ID;
          `).then(async([rows, fields]) => {
            if (rows[0]!=undefined) res.push(rows[0])
          });
      }
    });
    return res;
  },
  async getRecordsDetails(_, args) {
    let res = [];
    await connection.promise().query(`select DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AS WEEK_START_DATE ,loan.LOAN_OFFICER_SSN,count(loan.LOAN_OFFICER_SSN)as "No_Of_Loans_Handled",loan.LOAN_TYPE, SUM(LOAN_PAYMENTS.AMOUNT) AS AMOUNT_DEPOSITED from loan,loan_payments where loan.loan_no=loan_payments.loan_no and loan_payments.Date between DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and CURDATE() group by loan.LOAN_OFFICER_SSN;'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

module.exports = { reportQueries };