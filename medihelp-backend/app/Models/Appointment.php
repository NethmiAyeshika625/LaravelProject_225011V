<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    // Define the table name if necessary (optional if the table name follows the default naming convention)
    protected $table = 'appointments';  // This is optional if your table name is already 'appointments'

    // Define the primary key if different from the default 'id'
    protected $primaryKey = 'id';  // Optional if your primary key is the default 'id'

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'user_id',        // The ID of the user who books the appointment
        'doctor_id',      // The ID of the doctor being booked
        'appointment_date' // The date and time of the appointment
    ];

    // Define relationships

    // Each appointment belongs to a user (the one who books it)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');  // 'user_id' is the foreign key on appointments table
    }

    // Each appointment belongs to a doctor (the one who is being booked)
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');  // 'doctor_id' is the foreign key on appointments table
    }
}
