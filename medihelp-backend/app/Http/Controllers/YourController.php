<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class YourController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed|min:6', // Confirmed ensures password_confirmation field is required
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create user if validation passes
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password before saving
        ]);

        // Return success message
        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // Login a user and issue a token
    public function login(Request $request)
    {
        // Validate the login data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create a new token for the user using Laravel Sanctum
        $token = $user->createToken('authToken')->plainTextToken;

        // Return the token and user data
        return response()->json(['token' => $token, 'user' => $user], 200);
    }

  // Get a specific user by ID
public function getUser($id)
{
    // Attempt to find the user by ID
    $user = User::find($id);

    // Check if user exists
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Return user data if found
    return response()->json($user);
}

}
