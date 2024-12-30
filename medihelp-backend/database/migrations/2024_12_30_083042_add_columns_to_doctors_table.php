<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToDoctorsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->string('specialization')->nullable(); // Example: 'Cardiology'
            $table->string('phone')->nullable(); // Example: '+123456789'
            $table->string('email')->unique()->nullable(); // Doctor's email
            $table->text('bio')->nullable(); // Short bio about the doctor
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn(['specialization', 'phone', 'email', 'bio']);
        });
    }
}
