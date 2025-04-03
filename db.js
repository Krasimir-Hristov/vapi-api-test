// Sample order database
const orders_db = {
  '1001': {
    order_number: '101',
    customer_name: 'John Doe',
    order_date: '2023-07-15',
    total_amount: 125.99,
    status: 'shipped',
    shipping_address: '123 Main St, Anytown, AN 12345'
  },
  '1002': {
    order_number: '102',
    customer_name: 'Jane Smith',
    order_date: '2023-07-17',
    total_amount: 85.50,
    status: 'processing',
    shipping_address: '456 Oak Ave, Somewhere, SO 67890'
  },
  '1003': {
    order_number: '103',
    customer_name: 'Robert Johnson',
    order_date: '2023-07-18',
    total_amount: 250.75,
    status: 'delivered',
    shipping_address: '789 Pine Rd, Elsewhere, EL 10112'
  }
};

module.exports = { orders_db };
