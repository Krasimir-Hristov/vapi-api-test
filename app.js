const express = require('express');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Add documentation route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Orders API',
    endpoints: {
      getAllOrders: {
        method: 'GET',
        url: '/orders',
        description: 'Get all orders'
      },
      getOrder: {
        method: 'GET',
        url: '/orders/:id',
        description: 'Get a specific order by ID'
      },
      createOrder: {
        method: 'POST',
        url: '/orders',
        description: 'Create a new order'
      },
      updateOrder: {
        method: 'PUT',
        url: '/orders/:id',
        description: 'Update an existing order'
      },
      deleteOrder: {
        method: 'DELETE',
        url: '/orders/:id',
        description: 'Delete an order'
      }
    }
  });
});

// Routes
app.use('/orders', ordersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
