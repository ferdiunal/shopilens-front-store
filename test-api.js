const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "public", "products.json");

try {
    const data = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
    const products = JSON.parse(data);
    console.log(`Successfully read ${products.length} products.`);
    console.log('First product:', products[0].title);
} catch (error) {
    console.error('Error reading products.json:', error);
}
