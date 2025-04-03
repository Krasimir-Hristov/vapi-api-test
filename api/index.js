import express from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test if API is working
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', status: 'operational' });
});

export default app;
