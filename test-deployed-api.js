// Import node-fetch as ESM module (for v3)
import fetch from 'node-fetch';

// Your deployed API URL
const API_URL = 'https://vapi-api-test.vercel.app';

// Test GET request with better error handling
async function testGetRequest(endpoint) {
  try {
    console.log(`Testing GET ${API_URL}${endpoint}...`);
    // Add auth headers if needed 
    const headers = {
      // Uncomment and add your token if your Vercel project requires authentication
      // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
    };

    const response = await fetch(`${API_URL}${endpoint}`, { headers });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', response.headers.raw());

    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);

    const responseText = await response.text();
    console.log(`Response Body (first 150 chars): ${responseText.substring(0, 150)}...`);

    // Only try to parse as JSON if it's JSON content
    if (contentType && contentType.includes('application/json')) {
      const data = JSON.parse(responseText);
      console.log(`Parsed JSON:`, data);
      return data;
    } else {
      console.log('Response is not JSON. Check your API endpoint or server configuration.');
      return responseText;
    }
  } catch (error) {
    console.error(`Error testing GET ${endpoint}:`, error);
  }
}

// Test POST request with better error handling
async function testPostRequest(endpoint, body) {
  try {
    console.log(`Testing POST ${API_URL}${endpoint} with body:`, body);
    // Add auth headers if needed
    const headers = {
      'Content-Type': 'application/json',
      // Uncomment and add your token if your Vercel project requires authentication
      // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', response.headers.raw());

    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);

    const responseText = await response.text();
    console.log(`Response Body (first 150 chars): ${responseText.substring(0, 150)}...`);

    // Only try to parse as JSON if it's JSON content
    if (contentType && contentType.includes('application/json')) {
      const data = JSON.parse(responseText);
      console.log(`Parsed JSON:`, data);
      return data;
    } else {
      console.log('Response is not JSON. Check your API endpoint or server configuration.');
      return responseText;
    }
  } catch (error) {
    console.error(`Error testing POST ${endpoint}:`, error);
  }
}

// Run tests
async function runTests() {
  console.log("=== TESTING VERCEL DEPLOYMENT ===");
  console.log("Deployment URL:", API_URL);
  console.log("=================================");

  // Test the root endpoint
  await testGetRequest('/');

  // Test API info endpoint
  await testGetRequest('/api');

  // Test the dedicated test endpoint
  await testGetRequest('/api/test');

  // Test the test endpoint with query params
  await testGetRequest('/api/test?foo=bar&test=true');

  // Test the orders endpoint
  await testGetRequest('/orders');
}

runTests();
