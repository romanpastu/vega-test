const mockAssets = [
  {
    id: "id-apple",
    name: "Apple Inc.",
    type: "stock"
  },
  {
    id: "id-bitcoin",
    name: "Bitcoin",
    type: "crypto"
  },
  {
    id: "id-usd",
    name: "US Dollar",
    type: "fiat"
  },
  {
    id: "id-gbp",
    name: "British Pound",
    type: "fiat"
  }
];

const mockPrices = {
  "AAPL": { price: 190.32 },
  "BTC": { price: 42000.00 },
  "GBP": { price: 1.27 },
  "USD": { price: 1.00 }
};

const mockPortfolio = {
  id: "1",
  asOf: new Date().toISOString(),
  positions: [
    {
      id: 1,
      asset: "id-apple",
      quantity: 10,
      asOf: new Date().toISOString(),
      price: 190.32
    },
    {
      id: 2,
      asset: "id-bitcoin",
      quantity: 1,
      asOf: new Date().toISOString(),
      price: 42000.00
    }
  ]
};

module.exports = {
  mockAssets,
  mockPrices,
  mockPortfolio
}; 