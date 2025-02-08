const { mockPrices } = require('../data/mockData');

const getPrices = (req, res) => {
  const { assets, asOf, from, to } = req.query;
  
  if (!assets) {
    return res.json(Object.entries(mockPrices).map(([asset, data]) => ({
      id: `price-${asset}`,
      asset,
      ...data
    })));
  }

  const requestedAssets = assets.split(',');
  const prices = requestedAssets.map(asset => ({
    id: `price-${asset}`,
    asset,
    price: mockPrices[asset]?.price || 0
  }));

  res.json(prices);
};

module.exports = {
  getPrices
}; 