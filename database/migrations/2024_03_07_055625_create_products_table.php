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
            $table->string('name');
            $table->index('name');
            $table->foreignIdFor(Category::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(User::class);
            $table->decimal('price', 10, 2);
            $table->string('currency', 3);
            $table->decimal('discount', 10, 2)->default(0);
            $table->enum('discount_type', ['fixed', '%']);
            $table->integer('quantity')->default(1);
            $table->boolean('condition')->default(false); // 0 == New, 1 == Old
            $table->boolean('state')->default(0); // 0 == available, 1 == sold
            $table->text('description');
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
