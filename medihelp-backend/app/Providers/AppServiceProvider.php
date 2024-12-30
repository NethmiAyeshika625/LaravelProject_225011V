<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Example: Automatically apply a specific database connection to all queries
        \DB::listen(function ($query) {
            // Log SQL queries
            \Log::info($query->sql);
        });
    }
}
