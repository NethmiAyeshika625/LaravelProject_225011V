<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor; // Ensure Doctor model is imported
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    // Ensure that the user is authenticated for all methods
    public function __construct()
    {
        $this->middleware('auth:sanctum'); // For API authentication with Sanctum
    }

    // Get the list of doctors (name and id for the dropdown)
    public function getDoctors()
    {
        // Fetch all doctors with their id and name from the doctors table
        $doctors = Doctor::all(['id', 'name']);

        // Check if there are no doctors
        if ($doctors->isEmpty()) {
            return response()->json(['message' => 'No doctors found'], 404);
        }

        return response()->json($doctors); // Return the doctors list
    }

    // Fetch all appointments for the authenticated user
    public function index()
    {
        $appointments = Appointment::where('user_id', Auth::id())->get();

        // Check if no appointments are found
        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found'], 404);
        }

        return response()->json($appointments); // Return the appointments list
    }

    // Book a new appointment
    public function store(Request $request)
    {
        // Validate the input data
        $request->validate([
            'doctor_id' => 'required|integer|exists:doctors,id', // Ensure the doctor exists
            'appointment_date' => 'required|date|after:today', // Ensure the date is in the future
        ]);

        // Store the appointment in the database
        $appointment = Appointment::create([
            'user_id' => Auth::id(),
            'doctor_id' => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Appointment booked successfully',
            'appointment' => $appointment,
        ], 201); // 201 Created
    }

    // Update an existing appointment
    public function update(Request $request, $id)
    {
        // Find the appointment by ID
        $appointment = Appointment::findOrFail($id);

        // Ensure the authenticated user is the owner of the appointment
        if ($appointment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validate the input data
        $request->validate([
            'doctor_id' => 'required|integer|exists:doctors,id', // Ensure the doctor exists
            'appointment_date' => 'required|date|after:today', // Ensure the date is valid and in the future
        ]);

        // Update the appointment with the new details
        $appointment->update([
            'doctor_id' => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
        ]);

        // Return a success response with the updated appointment
        return response()->json([
            'message' => 'Appointment updated successfully',
            'appointment' => $appointment,
        ]);
    }

    // Delete an existing appointment
    public function destroy($id)
    {
        // Find the appointment by ID
        $appointment = Appointment::findOrFail($id);

        // Ensure the authenticated user is the owner of the appointment
        if ($appointment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Delete the appointment
        $appointment->delete();

        // Return a success response
        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }
}
