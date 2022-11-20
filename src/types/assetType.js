const assetType = `
  type Asset {
    ASSET_ID: ID!
    BRANCH_ID: String
    NAME: String
    TYPE: String
    STATUS: String
    COST: Float
    DATE_OF_PURCHASE: DateTime
  }

  input AssetInput {
    BRANCH_ID: String
    ASSET_ID: ID!
    NAME: String
    TYPE: String
    STATUS: String
    COST: Float
    DATE_OF_PURCHASE: String
  }
`;

module.exports = { assetType };