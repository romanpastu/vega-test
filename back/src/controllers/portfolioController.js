const { mockPortfolio } = require('../data/mockData');

const getPortfolio = (req, res) => {
  const { asOf } = req.query;
  // For demo purposes, we're returning the same portfolio regardless of the asOf date
  res.json(mockPortfolio);
};

module.exports = {
  getPortfolio
}; 