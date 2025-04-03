import express from 'express';
import cors from 'cors';

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
      { path: '/api/test', method: 'GET', description: 'Test endpoint' },
      { path: '/orders', method: 'GET', description: 'Get all orders' }
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

// Orders endpoint - return all orders
app.get('/orders', (req, res) => {
  // For now, we'll return mock data
  const mockOrders = [
    {
      id: '1',
      customer: 'John Doe',
      product: 'Widget A',
      quantity: 2,
      price: 19.99,
      date: '2025-04-01',
      status: 'delivered'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      product: 'Widget B',
      quantity: 1,
      price: 29.99,
      date: '2025-04-02',
      status: 'processing'
    },
    {
      id: '3',
      customer: 'Bob Johnson',
      product: 'Widget C',
      quantity: 3,
      price: 15.99,
      date: '2025-04-03',
      status: 'shipped'
    }
  ];

  res.json({
    message: 'Orders retrieved successfully',
    count: mockOrders.length,
    orders: mockOrders
  });
});

// Start the server if we're not in production (Vercel handles this in prod)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API for serverless functions
export default app;
