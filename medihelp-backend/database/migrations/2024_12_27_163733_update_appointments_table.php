<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('user_id'); // ID of the user booking the appointment
            $table->unsignedBigInteger('doctor_id'); // ID of the doctor
            $table->string('doctor_name'); // Name of the doctor (optional)
            $table->date('appointment_date'); // Appointment date
            $table->timestamps(); // Created at and updated at
        
            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('cascade');

            // Index for faster lookups
            $table->index('user_id');
            $table->index('doctor_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
