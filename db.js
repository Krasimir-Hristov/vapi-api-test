// Database module similar to Python's db.py

// This would be a class equivalent to the Python dataclass
class Order {
  constructor(order_number, customer_name, items, total_amount, order_date, status, shipping_address) {
    this.order_number = order_number;
    this.customer_name = customer_name;
    this.items = items;
    this.total_amount = total_amount;
    this.order_date = order_date;
    this.status = status;
    this.shipping_address = shipping_address;
  }
}

// Equivalent to the orders_db dictionary in Python
const orders_db = {
  "101": new Order(
    "101",
    "John Doe",
    [
      { "product": "Laptop", "quantity": 1, "price": 999.99 },
      { "product": "Mouse", "quantity": 1, "price": 29.99 }
    ],
    1029.98,
    new Date(2024, 2, 15, 14, 30), // Month is 0-based in JavaScript Date
    "Delivered",
    "123 Main St, New York, NY 10001"
  ),
  "102": new Order(
    "102",
    "Jane Smith",
    [
      { "product": "Headphones", "quantity": 2, "price": 79.99 },
      { "product": "Phone Case", "quantity": 1, "price": 19.99 }
    ],
    179.97,
    new Date(2024, 2, 16, 9, 15),
    "Processing",
    "456 Oak Ave, Los Angeles, CA 90001"
  ),
  "103": new Order(
    "103",
    "Bob Johnson",
    [
      { "product": "Smart Watch", "quantity": 1, "price": 299.99 },
      { "product": "Charger", "quantity": 1, "price": 24.99 }
    ],
    324.98,
    new Date(2024, 2, 17, 11, 45),
    "Shipped",
    "789 Pine Rd, Chicago, IL 60601"
  )
};

export { orders_db, Order };
