export default function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === 'GET') {
    // Mock data for orders
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

    return res.json({
      message: 'Orders retrieved successfully',
      count: mockOrders.length,
      orders: mockOrders
    });
  } else {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `HTTP method ${req.method} is not supported for this endpoint`
    });
  }
}
