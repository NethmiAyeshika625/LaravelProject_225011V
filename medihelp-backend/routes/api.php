<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YourController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// CSRF Cookie Endpoint (Required for SPA authentication)
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Public Routes (No Authentication Required)
Route::post('/register', [YourController::class, 'register']); // User Registration
Route::post('/login', [YourController::class, 'login'])->name('login'); // User Login
Route::get('/users/{id}', [YourController::class, 'getUser']); // Get a specific user by ID


Route::get('/test-api', function () {
    return response()->json(['message' => 'API is working!']);
});

// Authenticated Routes (Require CSRF Protection)
Route::middleware(['auth:sanctum', 'web'])->group(function () {
   
    // Doctor Management Routes
    Route::post('/doctors', [DoctorController::class, 'store']); // Add a new doctor
    Route::get('/doctors', [DoctorController::class, 'index']); // Fetch all doctors
    Route::put('/doctors/{id}', [DoctorController::class, 'update']); // Edit a doctor
    Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']); // Delete a doctor
});
