import express from 'express';
import cors from 'cors';
import { orders_db } from '../db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test if API is working
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    status: 'operational',
    endpoints: [
      { path: '/', method: 'GET', description: 'API root' },
      { path: '/api', method: 'GET', description: 'API info' },
      { path: '/orders', method: 'GET', description: 'Get all orders' },
      { path: '/orders', method: 'POST', description: 'Get order by order number' }
    ]
  });
});

export default app;
