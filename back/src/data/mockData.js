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
  positions: [
    {
      id: 1,
      asset: "id-apple",
      quantity: 10,
      asOf: "2024-01-15T00:00:00.000Z",
      price: 190.32
    },
    {
      id: 2,
      asset: "id-bitcoin",
      quantity: 1,
      asOf: "2024-01-15T00:00:00.000Z",
      price: 42000.00
    },
    {
      id: 3,
      asset: "id-apple",
      quantity: 5,
      asOf: "2023-12-15T00:00:00.000Z",
      price: 185.64
    },
    {
      id: 4,
      asset: "id-bitcoin",
      quantity: 0.5,
      asOf: "2023-11-20T00:00:00.000Z",
      price: 37500.00
    },
    {
      id: 5,
      asset: "id-apple",
      quantity: 15,
      asOf: "2023-10-01T00:00:00.000Z",
      price: 171.20
    },
    {
      id: 6,
      asset: "id-bitcoin",
      quantity: 0.75,
      asOf: "2023-09-15T00:00:00.000Z",
      price: 26500.00
    },
    {
      id: 7,
      asset: "id-apple",
      quantity: 8,
      asOf: "2023-08-01T00:00:00.000Z",
      price: 178.85
    },
    {
      id: 8,
      asset: "id-bitcoin",
      quantity: 1.2,
      asOf: "2023-07-15T00:00:00.000Z",
      price: 30100.00
    },
    {
      id: 9,
      asset: "id-apple",
      quantity: 12,
      asOf: "2023-06-01T00:00:00.000Z",
      price: 165.40
    },
    {
      id: 10,
      asset: "id-bitcoin",
      quantity: 0.8,
      asOf: "2023-05-15T00:00:00.000Z",
      price: 27200.00
    },
    {
      id: 11,
      asset: "id-apple",
      quantity: 20,
      asOf: "2023-04-01T00:00:00.000Z",
      price: 160.10
    },
    {
      id: 12,
      asset: "id-bitcoin",
      quantity: 1.5,
      asOf: "2023-03-15T00:00:00.000Z",
      price: 24800.00
    },
    {
      id: 13,
      asset: "id-apple",
      quantity: 18,
      asOf: "2023-02-01T00:00:00.000Z",
      price: 154.50
    },
    {
      id: 14,
      asset: "id-bitcoin",
      quantity: 0.9,
      asOf: "2023-01-15T00:00:00.000Z",
      price: 21000.00
    },
    {
      id: 15,
      asset: "id-apple",
      quantity: 25,
      asOf: "2022-12-15T00:00:00.000Z",
      price: 145.30
    },
    {
      id: 16,
      asset: "id-bitcoin",
      quantity: 1.1,
      asOf: "2022-12-01T00:00:00.000Z",
      price: 17200.00
    },
    {
      id: 17,
      asset: "id-apple",
      quantity: 15,
      asOf: "2022-11-15T00:00:00.000Z",
      price: 150.20
    },
    {
      id: 18,
      asset: "id-bitcoin",
      quantity: 0.6,
      asOf: "2022-11-01T00:00:00.000Z",
      price: 20500.00
    },
    {
      id: 19,
      asset: "id-apple",
      quantity: 22,
      asOf: "2022-10-15T00:00:00.000Z",
      price: 142.80
    },
    {
      id: 20,
      asset: "id-bitcoin",
      quantity: 1.3,
      asOf: "2022-10-01T00:00:00.000Z",
      price: 19100.00
    },
    {
      id: 21,
      asset: "id-apple",
      quantity: 12,
      asOf: "2022-09-15T00:00:00.000Z",
      price: 155.60
    },
    {
      id: 22,
      asset: "id-bitcoin",
      quantity: 0.95,
      asOf: "2022-09-01T00:00:00.000Z",
      price: 20200.00
    },
    {
      id: 23,
      asset: "id-apple",
      quantity: 18,
      asOf: "2022-08-15T00:00:00.000Z",
      price: 165.30
    },
    {
      id: 24,
      asset: "id-bitcoin",
      quantity: 0.7,
      asOf: "2022-08-01T00:00:00.000Z",
      price: 23100.00
    },
    {
      id: 25,
      asset: "id-apple",
      quantity: 30,
      asOf: "2022-07-15T00:00:00.000Z",
      price: 150.70
    },
    {
      id: 26,
      asset: "id-bitcoin",
      quantity: 1.4,
      asOf: "2022-07-01T00:00:00.000Z",
      price: 19500.00
    },
    {
      id: 27,
      asset: "id-apple",
      quantity: 16,
      asOf: "2022-06-15T00:00:00.000Z",
      price: 135.40
    },
    {
      id: 28,
      asset: "id-bitcoin",
      quantity: 0.85,
      asOf: "2022-06-01T00:00:00.000Z",
      price: 31500.00
    },
    {
      id: 29,
      asset: "id-apple",
      quantity: 28,
      asOf: "2022-05-15T00:00:00.000Z",
      price: 147.20
    }
  ]
};

module.exports = {
  mockAssets,
  mockPrices,
  mockPortfolio
}; 