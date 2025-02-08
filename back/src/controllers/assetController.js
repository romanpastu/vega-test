const { mockAssets } = require('../data/mockData');

const getAssets = (req, res) => {
  res.json(mockAssets);
};

module.exports = {
  getAssets
}; 