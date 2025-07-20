// This file is used to ensure all necessary files are included in the build
const fs = require('fs');
const path = require('path');

// Create a simple build script that verifies all required files exist
const requiredFiles = [
  'index.html',
  'thank-you.html',
  'css/styles.css',
  'js/script.js',
  'asset/cv_qa_engineer.pdf',
  'vercel.json',
  '_redirects'
];

// Check if all required files exist
let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Required file not found: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`Found: ${file}`);
  }
});

if (!allFilesExist) {
  console.error('Build failed: Some required files are missing');
  process.exit(1);
}

console.log('Build verification completed successfully');
