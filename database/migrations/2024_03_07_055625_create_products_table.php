<?php

use App\Models\Category;
use App\Models\Currency;
use App\Models\User;
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
            $table->string('name'); // ✅ Add this line
            $table->index('name');  // ✅ Now this makes sense
            $table->foreignIdFor(Category::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Currency::class);
            $table->decimal('net_price', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->integer('quantity')->default(1);
            $table->boolean('condition')->default(false);
            $table->enum('state', ['available', 'sold'])->default('available');
            $table->string('description');
            $table->index('description');
            $table->json('attributes')->nullable();
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
