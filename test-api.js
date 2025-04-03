const main = async () => {
  let fetch;
  try {
    // For Node.js >= 18 (built-in fetch)
    fetch = globalThis.fetch;
  } catch (error) {
    try {
      // For Node.js < 18 with node-fetch v3
      const { default: nodeFetch } = await import('node-fetch');
      fetch = nodeFetch;
    } catch (error2) {
      // For Node.js with node-fetch v2
      fetch = require('node-fetch');
    }
  }

  // API base URL - adjust if your server is running on a different port
  const API_URL = 'http://localhost:3000';

  // Function to test the orders endpoint
  console.log('Testing /orders endpoint...');

  // Test Case 1: Valid order number
  try {
    console.log('Attempting to send request to:', `${API_URL}/orders`);
    const validResponse = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNumber: '1001' })
    });

    const validData = await validResponse.json();
    console.log('Valid order test:', validResponse.status, validData);
  } catch (error) {
    console.error('Error testing valid order:', error.message);
  }

  // Test Case 2: Invalid order number
  try {
    const invalidResponse = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNumber: 'nonexistent' })
    });

    const invalidData = await invalidResponse.json();
    console.log('Invalid order test:', invalidResponse.status, invalidData);
  } catch (error) {
    console.error('Error testing invalid order:', error.message);
  }

  // Test Case 3: Missing order number
  try {
    const missingResponse = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    const missingData = await missingResponse.json();
    console.log('Missing order number test:', missingResponse.status, missingData);
  } catch (error) {
    console.error('Error testing missing order number:', error.message);
  }
};

// Run the tests
main().catch(error => {
  console.error('Failed to run tests:', error);
});
