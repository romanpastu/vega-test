const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.NODE_ENV === 'production' ? 1234 : 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const assetRoutes = require('./src/routes/assetRoutes');
const priceRoutes = require('./src/routes/priceRoutes');
const portfolioRoutes = require('./src/routes/portfolioRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/assets', assetRoutes);
app.use('/prices', priceRoutes);
app.use('/portfolios', portfolioRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// In production (Docker), bind to all interfaces
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log('Environment:', process.env.NODE_ENV);
}); 