<?php

use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

// return new class extends Migration
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignIdFor(Category::class);
            $table->decimal('net_price', 10, 2); // Changed from price to net_price
            $table->decimal('discount', 10, 2)->default(0); // New field
            $table->integer('quantity')->default(1); // New field
            $table->boolean('condition')->default(false); // 0 = new 1 = used
            $table->text('description');
            $table->decimal('latitude', 10, 7)->nullable(); // Store latitude
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('location')->nullable();
            $table->json('attributes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
