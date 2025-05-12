<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProductAttributeController;
use App\Http\Controllers\Mobile\UserMobileController;
use App\Http\Controllers\Mobile\ReportMobileController;
use App\Http\Controllers\Mobile\ReviewMobileController;
use App\Http\Controllers\Mobile\MessageMobileController;
use App\Http\Controllers\Mobile\FavoriteMobileController;
use App\Http\Controllers\ProductAttributeValueController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', [AuthController::class, 'userProfile']);
//     Route::post('/logout', [AuthController::class, 'logout']);
// });


///////////////////  FAVORITES  ///////////////////

// Route::post('/products/{product}/favorite', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
// Route for toggling the favorite status (add or remove from favorites)
Route::post('/products/{productId}/favorite', [FavoriteController::class, 'toggle'])
    ->name('favorites.toggle');
// Route for listing all favorite products of the authenticated user
Route::get('/favorites', [FavoriteController::class, 'index'])
    ->name('favorites.index');
// Route::post('/products/{product}/favorite', [FavoriteController::class, 'store'])->name('favorites.store');
// Route::delete('/products/{product}/favorite', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

///////////////// PRODUCTS///////////////////////

Route::apiResource('products', ProductController::class);
Route::get('categories/{id}/attributes', [ProductController::class, 'getAttributesByCategory']);
Route::patch('/products/{id}/state', [ProductController::class, 'StateOfProduct']);
Route::Post('products/update/{product}', [ProductController::class, 'update']);
Route::get('websiteProducts', [ProductController::class, 'websiteProducts']);
Route::get('productImages/{id}', [ProductController::class, 'allImages']);
Route::apiResource('product-attributes', ProductAttributeController::class);
Route::apiResource('product-attribute-values', ProductAttributeValueController::class);


///////////////////  CATEGORY  ///////////////////

Route::apiResource('categories', CategoryController::class);
Route::Post('categories/update/{category}', [CategoryController::class, 'update']);

///////////////////  MESSAGE  ///////////////////

Route::apiResource('messages', MessageController::class);
Route::apiResource('reports', ReportController::class);
Route::apiResource('reviews', ReviewController::class);

///////////////////  USERS  ///////////////////

Route::apiResource('users', UserController::class);
Route::put('users/{user}/status', [UserController::class, 'Status']);
Route::post('users/update/{user}', [UserController::class, 'update']);
Route::delete('bulk-delte-user', [UserController::class, 'bulkDelete']);



// Route::get('/categories/{category}/attributes', [CategoryController::class, 'getAttributes']);




Route::prefix('v1/mobile')->group(function () {

    // Public routes (unauthenticated mobile access)
    Route::get('/products', [ProductController::class, 'index']); // With filters
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::get('websiteProducts', [ProductController::class, 'websiteProducts']);


    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);

    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::get('/reviews/{review}', [ReviewController::class, 'show']);

    Route::get('/product-attributes', [ProductAttributeController::class, 'index']);
    Route::get('/product-attribute-values', [ProductAttributeValueController::class, 'index']);

    // Search route
    Route::get('/search/products', [ProductController::class, 'index']); // Use ?search=query

    // Optional filter-specific route if needed
    Route::get('/products/filter', [ProductController::class, 'index']); // Uses request filters

    // Authenticated routes (needs mobile login)
    Route::middleware('auth:sanctum')->group(function () {

        // User
        // Route::get('/me', [AuthController::class, 'userProfile']);
        // Route::post('/logout', [AuthController::class, 'logout']);

        // User-specific products
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Favorites
        Route::post('/products/{product}/favorite', [FavoriteController::class, 'store']);
        Route::delete('/products/{product}/favorite', [FavoriteController::class, 'destroy']);

        // Reviews
        Route::post('/reviews', [ReviewController::class, 'store']);

        // Messaging
        Route::apiResource('/messages', MessageController::class);

        // Image updates
        // Route::post('/images', [ImageController::class, 'store']);
        // Route::put('/images/update/{id}', [ImageController::class, 'update']);
        // Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    });
});
