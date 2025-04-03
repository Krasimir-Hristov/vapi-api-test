const express = require('express');
const router = express.Router();
const orders = require('../data/orders');

// Get all orders with proper schema in response
router.get('/', (req, res) => {
  try {
    // Create a response object with well-defined schema
    const response = {
      status: 'success',
      count: Object.keys(orders).length,
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
router.get('/:id', (req, res) => {
  try {
    const order = orders[req.params.id];
    if (order) {
      // Return detailed order info with proper schema
      const response = {
        status: 'success',
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;
