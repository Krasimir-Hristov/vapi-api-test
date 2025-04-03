import { orders_db } from '../db.js';

export default function handler(req, res) {
  // GET method - return all orders
  if (req.method === 'GET') {
    return res.json({
      message: 'Orders retrieved successfully',
      count: Object.keys(orders_db).length,
      orders: orders_db
    });
  }
  // POST method - look up specific order
  else if (req.method === 'POST') {
    const data = req.body;

    // Check if JSON is valid
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
  }
  // Other methods not allowed
  else {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `HTTP method ${req.method} is not supported for this endpoint`
    });
  }
}
