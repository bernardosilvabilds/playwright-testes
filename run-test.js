const { execSync } = require('child_process');

try {
  console.log('Running Playwright test...');
  const output = execSync('npx playwright test tests/simple-test.spec.js --reporter=json', { encoding: 'utf8' });
  console.log('Test output:');
  console.log(output);
} catch (error) {
  console.error('Error running test:');
  console.error(error.message);
  if (error.stdout) {
    console.log('Standard output:');
    console.log(error.stdout);
  }
  if (error.stderr) {
    console.log('Standard error:');
    console.log(error.stderr);
  }
}
