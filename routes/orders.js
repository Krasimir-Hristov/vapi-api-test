const express = require('express');
const router = express.Router();
const orders = require('../data/orders');

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get a specific order by ID
router.get('/:id', (req, res) => {
  const order = orders[req.params.id];
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Create a new order
router.post('/', (req, res) => {
  const newOrder = req.body;

  if (!newOrder.order_number || orders[newOrder.order_number]) {
    return res.status(400).json({ message: "Invalid order number or order already exists" });
  }

  orders[newOrder.order_number] = newOrder;
  res.status(201).json(newOrder);
});

// Update an existing order
router.put('/:id', (req, res) => {
  const orderId = req.params.id;

  if (!orders[orderId]) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders[orderId] = { ...orders[orderId], ...req.body };
  res.json(orders[orderId]);
});

// Delete an order
router.delete('/:id', (req, res) => {
  const orderId = req.params.id;

  if (!orders[orderId]) {
    return res.status(404).json({ message: "Order not found" });
  }

  delete orders[orderId];
  res.status(204).end();
});

module.exports = router;
