import { execSync } from 'child_process';

console.log('Fixing vulnerabilities in the project...');

try {
  // First let's check what vulnerabilities exist
  console.log('\n=== CHECKING VULNERABILITIES ===');
  execSync('npm audit', { stdio: 'inherit' });

  // Try to fix vulnerabilities without breaking changes
  console.log('\n=== ATTEMPTING SAFE FIXES ===');
  execSync('npm audit fix', { stdio: 'inherit' });

  console.log('\n=== CHECKING REMAINING VULNERABILITIES ===');
  execSync('npm audit', { stdio: 'inherit' });

  // Get specific about the problematic package - likely node-fetch
  console.log('\n=== UPDATING SPECIFIC PACKAGES ===');

  // node-fetch v2 has vulnerabilities - update to v3 if possible
  console.log('Updating node-fetch...');
  execSync('npm uninstall node-fetch', { stdio: 'inherit' });
  execSync('npm install node-fetch@^3.3.0', { stdio: 'inherit' });

  console.log('\n=== FINAL VULNERABILITY CHECK ===');
  execSync('npm audit', { stdio: 'inherit' });

  console.log('\nDone! Check above for any remaining issues.');
} catch (error) {
  console.error('Error during vulnerability fix:', error.message);
}
