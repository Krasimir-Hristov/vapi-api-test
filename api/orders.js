export default function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === 'GET') {
    // Mock data for orders using the new structure
    const mockOrders = {
      "101": {
        order_number: "101",
        customer_name: "John Doe",
        items: [
          { "product": "Laptop", "quantity": 1, "price": 999.99 },
          { "product": "Mouse", "quantity": 1, "price": 29.99 }
        ],
        total_amount: 1029.98,
        order_date: "2024-03-15T14:30:00",
        status: "Delivered",
        shipping_address: "123 Main St, New York, NY 10001"
      },
      "102": {
        order_number: "102",
        customer_name: "Jane Smith",
        items: [
          { "product": "Headphones", "quantity": 2, "price": 79.99 },
          { "product": "Phone Case", "quantity": 1, "price": 19.99 }
        ],
        total_amount: 179.97,
        order_date: "2024-03-16T09:15:00",
        status: "Processing",
        shipping_address: "456 Oak Ave, Los Angeles, CA 90001"
      },
      "103": {
        order_number: "103",
        customer_name: "Bob Johnson",
        items: [
          { "product": "Smart Watch", "quantity": 1, "price": 299.99 },
          { "product": "Charger", "quantity": 1, "price": 24.99 }
        ],
        total_amount: 324.98,
        order_date: "2024-03-17T11:45:00",
        status: "Shipped",
        shipping_address: "789 Pine Rd, Chicago, IL 60601"
      }
    };

    return res.json({
      message: 'Orders retrieved successfully',
      count: Object.keys(mockOrders).length,
      orders: mockOrders
    });
  } else {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `HTTP method ${req.method} is not supported for this endpoint`
    });
  }
}
