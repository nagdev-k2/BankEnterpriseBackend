const {connection} = require('../config/dbConnector');

const defaultAsset = {
  ASSET_ID: 'NA',
  BRANCH_ID: 'NA',
  NAME: 'NA',
  TYPE: 'NA',
  STATUS: 'INACTIVE',
  COST: 0.00,
  DATE_OF_PURCHASE: 'NA'
}


const assetQueries = {
  async getAllAssets() {
    let res = [defaultAsset]
    await connection.promise().query('select * from Assets').then(([rows, fields]) => {
      res = rows
    });
    return res;
  },
  async getAssetDetails(_, args) {
    let res = defaultAsset;
    await connection.promise().query(`select * from Assets where ASSET_ID = '${args.AssetId}'`).then(([rows, fields]) => {
      res = rows[0]
    });
    return res;
  },
};

const assetMutations = {
  async createAsset(_, args) {
    let res = 'No Data';    
    const { ASSET_ID, BRANCH_ID, NAME, TYPE, STATUS, COST, DATE_OF_PURCHASE } = args.asset;
    console.log(args.asset);
    await connection.promise().query(`insert into Assets values("${ASSET_ID}", "${BRANCH_ID}", "${NAME}", "${TYPE}", "${STATUS}", "${COST}", "${DATE_OF_PURCHASE}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
  async deleteAsset(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`delete from Assets where ASSET_ID=${args.asset_id}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
};

module.exports = { assetQueries, assetMutations };