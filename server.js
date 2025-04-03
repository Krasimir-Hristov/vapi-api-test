import express from 'express';
import cors from 'cors';
import { orders_db } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test if API is working
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', status: 'operational' });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'API is working!',
    endpoints: [
      { path: '/', method: 'GET', description: 'API root' },
      { path: '/api', method: 'GET', description: 'API info' },
      { path: '/orders', method: 'GET', description: 'Get all orders' },
      { path: '/orders', method: 'POST', description: 'Get order by order number' }
    ]
  });
});

// GET all orders endpoint
app.get('/orders', (req, res) => {
  res.json({
    message: 'Orders retrieved successfully',
    count: Object.keys(orders_db).length,
    orders: orders_db
  });
});

// POST order lookup - equivalent to the Flask /orders POST endpoint
app.post('/orders', (req, res) => {
  const data = req.body;

  // Check if JSON is valid (Express already handles this, but keeping for clarity)
  if (!data) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Check for required orderNumber field
  if (!data.orderNumber) {
    return res.status(400).json({ error: 'Missing orderNumber' });
  }

  const orderNumber = data.orderNumber;

  // Check if order exists in database
  if (orderNumber in orders_db) {
    const order = orders_db[orderNumber];

    // Format date to match Python's ISO format
    const formattedDate = order.order_date.toISOString();

    return res.json({
      order_number: order.order_number,
      customer_name: order.customer_name,
      order_date: formattedDate,
      total_amount: order.total_amount,
      status: order.status,
      shipping_address: order.shipping_address
    });
  }

  // If order not found
  return res.status(404).json({ error: 'Order not found' });
});

// Start the server if we're not in production (Vercel handles this in prod)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API for serverless functions
export default app;
