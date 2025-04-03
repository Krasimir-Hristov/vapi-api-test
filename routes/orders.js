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


module.exports = router;
