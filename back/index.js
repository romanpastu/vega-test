const express = require('express');
const app = express();
const port = 3000;

// Middleware
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 