const https = require('https');

const API_BASE = "https://fakestoreapi.com";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json"
};

async function testFetch() {
    console.log("Testing fetch to", `${API_BASE}/products`);
    try {
        const response = await fetch(`${API_BASE}/products`, {
            headers: HEADERS
        });

        console.log("Status:", response.status);
        if (!response.ok) {
            console.error("Failed:", response.statusText);
        } else {
            console.log("Success (first 50 chars):", (await response.text()).substring(0, 50));
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testFetch();
