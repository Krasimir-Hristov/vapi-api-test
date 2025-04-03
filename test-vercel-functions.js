// Import node-fetch as ESM module (for v3)
import fetch from 'node-fetch';

// Your deployed API URL
const BASE_URL = 'https://vapi-api-test.vercel.app';

// Test different URL patterns
async function testUrl(url) {
  console.log(`\nTesting URL: ${url}`);
  try {
    const response = await fetch(url);
    console.log(`Status: ${response.status} ${response.statusText}`);

    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);

    const text = await response.text();
    console.log(`Response preview: ${text.substring(0, 100)}...`);

    return { status: response.status, text };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

async function runTests() {
  console.log("=== TESTING VERCEL DEPLOYMENT WITH DIFFERENT URL PATTERNS ===");

  // Test various possible URL patterns
  await testUrl(`${BASE_URL}`);
  await testUrl(`${BASE_URL}/api`);
  await testUrl(`${BASE_URL}/api/index`);
  await testUrl(`${BASE_URL}/api/test`);

  // Testing alternate formats
  await testUrl(`${BASE_URL}/.netlify/functions/server`);
  await testUrl(`${BASE_URL}/api/v1`);
  await testUrl(`${BASE_URL}/function/api`);
}

runTests();
