const assetType = `
  type Assets {
    ASSET_ID: ID!
    BRANCH_ID: String
    NAME: String
    TYPE: String
    STATUS: String
    COST: Float 
  }
`;

module.exports = { assetType };