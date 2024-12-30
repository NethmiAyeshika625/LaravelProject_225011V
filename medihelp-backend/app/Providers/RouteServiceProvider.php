<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        // Configure rate limiting
        $this->configureRateLimiting();

        // Register the routes for the application
        $this->routes(function () {
            // Define routes for the 'api' middleware group
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Define routes for the 'web' middleware group
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        // Set a rate limit for API requests
        RateLimiter::for('api', function (Request $request) {
            // Limit to 60 requests per minute per user or IP
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
