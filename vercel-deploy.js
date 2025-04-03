import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to check if Vercel CLI is installed
function isVercelCliInstalled() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to deploy to Vercel
function deployToVercel() {
  console.log('Starting Vercel deployment...');

  try {
    // Create a minimal index.js file for testing
    const indexJsContent = `
      export default function handler(req, res) {
        res.json({
          message: 'API is working!',
          timestamp: new Date().toISOString(),
          path: req.url
        });
      };
    `;

    // Ensure api directory exists
    if (!fs.existsSync('api')) {
      fs.mkdirSync('api');
    }

    // Write simple test API
    fs.writeFileSync('api/index.js', indexJsContent);

    // Deploy with Vercel CLI
    console.log('Deploying with Vercel CLI...');
    // Use --prod flag to deploy to production
    execSync('vercel --prod', { stdio: 'inherit' });

    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error.message);
  }
}

// Main execution
if (!isVercelCliInstalled()) {
  console.log('Vercel CLI is not installed. Please install it with:');
  console.log('npm install -g vercel');
} else {
  deployToVercel();
}
