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
  await connection.promise().query('SELECT ASSET_ID FROM assets ORDER BY ASSET_ID DESC LIMIT 1').then(([rows, fields]) => {
    res = rows[0]
  });
  res = res['ASSET_ID'].split('_')
  res = `${res[0]}_0${(parseInt(res[1])+1)}`
  return res;
}

const assetMutations = {
  async createAsset(_, args) {
    let res = 'No Data';    

    await connection.promise().query('SELECT ASSET_ID FROM assets ORDER BY ASSET_ID DESC LIMIT 1').then(([rows, fields]) => {
      val = rows[0]
    });

    if(val)
    {
      res = val['ASSET_ID'].split('_')
      asset_id = `${res[0]}_0${(parseInt(res[1])+1)}`
    }
    else
    {
      asset_id="Aid_00"
    }


    const { BRANCH_ID, NAME, TYPE, STATUS, COST, DATE_OF_PURCHASE } = args.asset;
    await connection.promise().query(`insert into assets values("${asset_id}", "${BRANCH_ID}", "${NAME}", "${TYPE}", "${STATUS}", "${COST}", "${DATE_OF_PURCHASE}")`).then((result, err) => {
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
    await connection.promise().query(`delete from assets where ASSET_ID=${args.asset_id}`).then((result, err) => {
      if (result) {
        res = 'Data Delete successfully';
      } else {
        res = 'Failed to Delete data';
      }
    });
    return res;
  },
  async updateAsset(_, args) {
    let res = 'No Data';    
    await connection.promise().query(`update assets set NAME=${args.assets.NAME},TYPE=${args.assets.TYPE},STATUS=${args.assets.STATUS},COST=${args.assets.COST},DATE_OF_PURCHASE=${args.assets.DATE_OF_PURCHASE} where ASSET_ID=${args.assets.ASSET_ID}`).then((result, err) => {
      if (result) {
        res = 'Data Updated successfully';
      } else {
        res = 'Failed to Update data';
      }
    });
    return res;
  },
};

module.exports = { assetQueries, assetMutations };