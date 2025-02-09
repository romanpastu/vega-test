# Financial Portfolio API

A simple Express.js API that provides financial portfolio information.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on http://localhost:3000

## API Endpoints

### 1. POST /auth/login
Authenticates a user and returns a token. For testing purposes, accepts any username and password combination.

Request body:
```json
{
    "username": "any_username",
    "password": "any_password"
}
```

Example response:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidG9rZW4ifQ.aXh-jeDNyVGWEvDx-ehkyOJHZhZY1UhxW8YNKPqjIhw"
}
```

### 2. GET /assets
Fetches a list of all financial instruments the user may own, including cryptocurrency, stocks, and cash.

Example response:
```json
[
  {
    "id": "some-id",
    "name": "Apple Inc.",
    "type": "stock"
  }
]
```

### 3. GET /prices
Fetches the latest price for one or multiple assets. All prices are provided in USD.

Query Parameters:
- `assets`: Comma-separated list of asset symbols (e.g., "GBP,BTC,AAPL")
- `asOf`: Get price at a specific date (YYYY-MM-DD)
- `from`: Start date for price range (YYYY-MM-DD)
- `to`: End date for price range (YYYY-MM-DD)

Example: `/prices?assets=GBP,BTC,AAPL`

Example response:
```json
[
  {
    "id": "price-AAPL",
    "asset": "AAPL",
    "price": 190.32
  }
]
```

### 4. GET /portfolios
Fetches a list of user positions.

Query Parameters:
- `asOf`: Get portfolio at a specific date (YYYY-MM-DD)

Example response:
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "positions": [
    {
      "id": 1,
      "asset": "550e8400-e29b-41d4-a716-446655440000",
      "quantity": 10,
      "price": 190.32
    }
  ]
}
``` 