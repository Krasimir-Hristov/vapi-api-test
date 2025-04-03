const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test if API is working
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', status: 'operational' });
});

// Example API endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'API is working!',
    endpoints: [
      { path: '/', method: 'GET', description: 'API root' },
      { path: '/api', method: 'GET', description: 'API info' },
      { path: '/api/test', method: 'GET', description: 'Test endpoint' }
    ]
  });
});

// Simple test endpoint that returns timestamp and request info
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint successful',
    timestamp: new Date().toISOString(),
    requestInfo: {
      headers: req.headers,
      query: req.query,
      ip: req.ip
    }
  });
});

// Start the server if we're not in production (Vercel handles this in prod)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API for serverless functions
module.exports = app;
