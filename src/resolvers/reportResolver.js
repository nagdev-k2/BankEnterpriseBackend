const {connection} = require('../config/dbConnector');

const reportQueries = {
  async getBranchReport() {
    let res = []
    await connection.promise().query('select BRANCH_ID from BRANCH').then(async([rows, fields]) => {
      for(let i = 0; i < rows.length; i++) {
        await connection.promise().query(`select LOAN.BRANCH_ID, DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), '%Y-%m-%d' ) AS WEEK_START_DATE ,LOAN.LOAN_OFFICER_SSN,count(LOAN.LOAN_OFFICER_SSN) as NO_OF_LOANS_HANDLED,LOAN.LOAN_TYPE, SUM(LOAN_PAYMENTS.AMOUNT) AS AMOUNT_DEPOSITED from LOAN,LOAN_PAYMENTS where LOAN.LOAN_NO=LOAN_PAYMENTS.LOAN_NO and LOAN_PAYMENTS.DATE between DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and CURDATE() group by LOAN.BRANCH_ID, LOAN.LOAN_TYPE, LOAN.LOAN_OFFICER_SSN
          `).then(async([rows, fields]) => {
            if (rows[0]!=undefined) res.push(rows[0])
          });
      }
    });
    return res;
  },
  async getWeeklyReport(_, args) {
    let res = [];
    await connection.promise().query(`select LOAN.BRANCH_ID,DATE_FORMAT( DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY),, '%Y-%m-%d') AS WEEK_START_DATE ,LOAN.LOAN_OFFICER_SSN,count(LOAN.LOAN_OFFICER_SSN) as NO_OF_LOANS_HANDLED,LOAN.LOAN_TYPE, SUM(LOAN_PAYMENTS.AMOUNT) AS AMOUNT_DEPOSITED from LOAN,LOAN_PAYMENTS where LOAN.LOAN_NO=LOAN_PAYMENTS.LOAN_NO and LOAN_PAYMENTS.DATE between DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and CURDATE() group by LOAN.BRANCH_ID, LOAN.LOAN_TYPE, LOAN.LOAN_OFFICER_SSN`).then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
};

module.exports = { reportQueries };