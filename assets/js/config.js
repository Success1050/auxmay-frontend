// This file acts as our frontend environment variables

// Automatically detect if we are running locally or on the live Vercel site
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';

const ENV = {
    // If local or opened from a file, use localhost:3000. Otherwise, use the live Render backend.
    API_URL: isLocalhost ? 'http://localhost:8080' : 'https://axumay-backend.onrender.com'
};
