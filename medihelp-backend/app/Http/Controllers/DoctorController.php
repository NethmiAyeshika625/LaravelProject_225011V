<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    // Fetch all doctors
    public function index()
    {
        // Fetch all doctors with their details
        $doctors = Doctor::all(); 

        if ($doctors->isEmpty()) {
            return response()->json(['message' => 'No doctors found'], 404);
        }

        return response()->json($doctors);
    }

    // Add a new doctor
    public function store(Request $request)
    {
        // Validate the input for all fields
        $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'phone' => 'required|string|max:15|unique:doctors,phone',
            'email' => 'required|email|max:255|unique:doctors,email',
            'bio' => 'nullable|string|max:500',
        ]);

        // Create a new doctor record
        $doctor = Doctor::create($request->all());

        return response()->json([
            'message' => 'Doctor added successfully',
            'doctor' => $doctor,
        ], 201);
    }


    public function update(Request $request, $id)
{
    // Find the doctor by ID
    $doctor = Doctor::find($id);

    // If the doctor is not found, return a 404 error
    if (!$doctor) {
        return response()->json(['message' => 'Doctor not found'], 404);
    }

    // Validate the incoming request data
    $request->validate([
        'name' => 'required|string|max:255',
        'specialization' => 'required|string|max:255',
        'phone' => 'required|string|max:15|unique:doctors,phone,' . $id, // Exclude current doctor’s phone number
        'email' => 'required|email|max:255|unique:doctors,email,' . $id, // Exclude current doctor’s email
        'bio' => 'nullable|string|max:500',
    ]);

    

    // Update the doctor's information
    $doctor->update($request->only('name', 'specialization', 'phone', 'email', 'bio'));

    // Return the updated doctor data as a response
    return response()->json([
        'message' => 'Doctor updated successfully.',
        'doctor' => $doctor,
    ], 200);
}


public function destroy($id)
{
    // Find the doctor by ID
    $doctor = Doctor::find($id);

    // If the doctor is not found, return a 404 error
    if (!$doctor) {
        return response()->json(['message' => 'Doctor not found'], 404);
    }

    // Delete the doctor
    $doctor->delete();

    // Return a success message
    return response()->json(['message' => 'Doctor deleted successfully.'], 200);
}
}
