<?php
return [
    // Define paths that are allowed to have CORS headers
    'paths' => [
        'api/*',             // API routes
        'sanctum/csrf-cookie' // CSRF token route (important for login/signup)
    ],

    // Define which HTTP methods are allowed
    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, etc.)

    // Define which origins are allowed to access the API
    'allowed_origins' => [
        'http://localhost:3000'],

    // Define which headers are allowed in requests
    'allowed_headers' => [
        'Content-Type', 
        'X-Requested-With', 
        'X-XSRF-TOKEN', // Include CSRF token
        'Authorization',  // Authorization header for Bearer token, etc.
    ],

    // Optional: Define patterns for origins if needed
    'allowed_origins_patterns' => [],

    // Optional: Headers that can be exposed to the frontend
    'exposed_headers' => [],

    // Max age of the CORS preflight request in seconds
    'max_age' => 0,

    // Supports cookies and credentials (needed for authentication)
    'supports_credentials' => true, // This is important for handling sessions and CSRF cookies
];
