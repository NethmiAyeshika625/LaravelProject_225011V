<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        // Check if the request expects JSON (API request)
        if (! $request->expectsJson()) {
            // For web requests, redirect to the login page
            return route('login');
        }

        // For API requests, return a 401 Unauthorized response
        abort(response()->json(['message' => 'Unauthorized'], 401));
    }

    /**
     * Handle unauthenticated requests via API.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleUnauthenticatedApi(Request $request)
    {
        return response()->json([
            'message' => 'Unauthorized, please log in to continue'
        ], 401);
    }
}
