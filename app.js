const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log("Body:", req.body);
  }
  next();
});


// Orders data
const orders = {
  "101": {
    order_number: "101",
    customer_name: "John Doe",
    items: [
      { product: "Laptop", quantity: 1, price: 999.99 },
      { product: "Mouse", quantity: 1, price: 29.99 }
    ],
    total_amount: 1029.98,
    order_date: new Date(2024, 2, 15, 14, 30), // Note: Month is 0-based in JavaScript
    status: "Delivered",
    shipping_address: "123 Main St, New York, NY 10001"
  },
  "102": {
    order_number: "102",
    customer_name: "Jane Smith",
    items: [
      { product: "Headphones", quantity: 2, price: 79.99 },
      { product: "Phone Case", quantity: 1, price: 19.99 }
    ],
    total_amount: 179.97,
    order_date: new Date(2024, 2, 16, 9, 15),
    status: "Processing",
    shipping_address: "456 Oak Ave, Los Angeles, CA 90001"
  },
  "103": {
    order_number: "103",
    customer_name: "Bob Johnson",
    items: [
      { product: "Smart Watch", quantity: 1, price: 299.99 },
      { product: "Charger", quantity: 1, price: 24.99 }
    ],
    total_amount: 324.98,
    order_date: new Date(2024, 2, 17, 11, 45),
    status: "Shipped",
    shipping_address: "789 Pine Rd, Chicago, IL 60601"
  }
};

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

// Get all orders with proper schema in response
app.get('/orders', (req, res) => {
  try {
    // Create a response object with well-defined schema
    const response = {

      data: orders
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get a specific order by ID with detailed information
app.get('/orders/:id', (req, res) => {
  try {
    const order = orders[req.params.id];
    if (order) {
      // Return detailed order info with proper schema
      const response = {
        data: {
          order_number: order.order_number,
          customer_name: order.customer_name,
          items: order.items,
          total_amount: order.total_amount,
          order_date: order.order_date,
          status: order.status,
          shipping_address: order.shipping_address
        }
      };

      res.json(response);
    } else {
      res.status(404).json({
        status: 'error',
        message: "Order not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create a new order with schema validation
app.post('/orders', (req, res) => {
  try {
    const newOrder = req.body;

    if (!newOrder.order_number || orders[newOrder.order_number]) {
      return res.status(400).json({
        status: 'error',
        message: "Invalid order number or order already exists"
      });
    }

    // Validate required fields
    const requiredFields = ['customer_name', 'items', 'total_amount', 'status', 'shipping_address'];
    for (const field of requiredFields) {
      if (!newOrder[field]) {
        return res.status(400).json({
          status: 'error',
          message: `Missing required field: ${field}`
        });
      }
    }

    // Add order date if not provided
    if (!newOrder.order_date) {
      newOrder.order_date = new Date();
    }

    orders[newOrder.order_number] = newOrder;

    res.status(201).json({
      status: 'success',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update an existing order
app.put('/orders/:id', (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orders[orderId]) {
      return res.status(404).json({
        status: 'error',
        message: "Order not found"
      });
    }

    orders[orderId] = { ...orders[orderId], ...req.body };

    res.json({
      status: 'success',
      data: orders[orderId]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orders[orderId]) {
      return res.status(404).json({
        status: 'error',
        message: "Order not found"
      });
    }

    delete orders[orderId];

    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

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
