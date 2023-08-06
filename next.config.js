const withPWA = require("next-pwa");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    target: 'serverless', // This ensures compatibility with platforms like GitHub Pages
    // Other configurations if needed
    images: {
        // Set this to true to disable Image Optimization
        unoptimized: true,
      },
};