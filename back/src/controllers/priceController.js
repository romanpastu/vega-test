const { mockPrices, mockAssets } = require('../data/mockData');

// Create a mapping between symbols and asset IDs
const symbolToAssetId = {
  'AAPL': 'id-apple',
  'BTC': 'id-bitcoin',
  'USD': 'id-usd',
  'GBP': 'id-gbp'
};

const getPrices = (req, res) => {
  const { assets, asOf, from, to } = req.query;
  
  if (!assets) {
    return res.json(Object.entries(mockPrices).map(([symbol, data]) => ({
      id: `price-${symbolToAssetId[symbol]}`,
      asset: symbolToAssetId[symbol],
      ...data
    })));
  }

  const requestedAssets = assets.split(',');
  const prices = requestedAssets.map(symbol => ({
    id: `price-${symbolToAssetId[symbol]}`,
    asset: symbolToAssetId[symbol],
    price: mockPrices[symbol]?.price || 0
  }));

  res.json(prices);
};

module.exports = {
  getPrices
}; 