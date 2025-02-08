const mockAssets = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Apple Inc.",
    type: "stock"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Bitcoin",
    type: "crypto"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "US Dollar",
    type: "fiat"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
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
  id: "660e8400-e29b-41d4-a716-446655440000",
  asOf: new Date().toISOString(),
  positions: [
    {
      id: 1,
      asset: "550e8400-e29b-41d4-a716-446655440000",
      quantity: 10,
      asOf: new Date().toISOString(),
      price: 190.32
    },
    {
      id: 2,
      asset: "550e8400-e29b-41d4-a716-446655440001",
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