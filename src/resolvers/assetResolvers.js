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
    createAssetId()
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

const createAssetId = async () => {
  let res = [defaultAsset];
  await connection.promise().query('SELECT ASSET_ID FROM Assets ORDER BY ASSET_ID DESC LIMIT 1').then(([rows, fields]) => {
    res = rows[0]
  });
  res = res['ASSET_ID'].split('_')
  res = `${res[0]}_0${(parseInt(res[1])+1)}`
  return res;
}

const assetMutations = {
  async createAsset(_, args) {
    let res = 'No Data';    
    const { BRANCH_ID, NAME, TYPE, STATUS, COST, DATE_OF_PURCHASE } = args.asset;
    await connection.promise().query(`insert into Assets values("${createAssetId()}", "${BRANCH_ID}", "${NAME}", "${TYPE}", "${STATUS}", "${COST}", "${DATE_OF_PURCHASE}")`).then((result, err) => {
      if (result) {
        res = 'Data inserted successfully';
      } else {
        res = 'Failed to insert data';
      }
    });
    return res;
  },
};

module.exports = { assetQueries, assetMutations };