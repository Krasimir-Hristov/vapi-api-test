const express = require('express');
const cors = require('cors');
const { orders_db } = require('./db');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Orders API is running!');
});

// Route to get order by order number (POST endpoint)
app.post('/orders', (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (!data.orderNumber) {
    return res.status(400).json({ error: "Missing orderNumber" });
  }

  const orderNumber = data.orderNumber;

  if (orderNumber in orders_db) {  // JavaScript syntax using 'in' operator to check if key exists
    const order = orders_db[orderNumber];  // JavaScript const declaration

    return res.json({  // JavaScript object literal syntax with Express response
      order_number: order.order_number,
      customer_name: order.customer_name,
      order_date: order.order_date,
      total_amount: order.total_amount,
      status: order.status,
      shipping_address: order.shipping_address
    });
  }

  return res.status(404).json({ error: "Order not found" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Available orders: ${Object.keys(orders_db).join(', ')}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;
