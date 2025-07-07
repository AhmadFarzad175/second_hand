<?php

use App\Http\Controllers\APIForMobile\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ProductTransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CurrencyController;

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProductAttributeController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/auth/google', [AuthController::class, 'googleLogin']);

Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('categoriesWithoutImage', [CategoryController::class, 'CategoryWithoutImage']);
Route::get('websiteProducts', [ProductController::class, 'websiteProducts']);
Route::get('productImages/{id}', [ProductController::class, 'allImages']);
Route::apiResource('categories', CategoryController::class);
Route::get('productDetails/{product}', [ProductController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Transaction routes
    Route::prefix('transactions')->group(function () {
        Route::post('/', [ProductTransactionController::class, 'store']);
        Route::get('/', [ProductTransactionController::class, 'index']);
        Route::get('/pending', [ProductTransactionController::class, 'pending']);
        Route::patch('/{transaction}/status', [ProductTransactionController::class, 'updateStatus']);
        Route::delete('/{transaction}', [ProductTransactionController::class, 'destroy']);
    });



    ///////////////////  DASHBOARD  ///////////////////


    Route::get('/stats', [DashboardController::class, 'getStats']);
    Route::get('/recent-products', [DashboardController::class, 'getRecentProducts']);
    Route::get('/recent-users', [DashboardController::class, 'getRecentUsers']);
    Route::get('/reports', [DashboardController::class, 'getReports']);
    Route::get('/reviews', [DashboardController::class, 'getReviews']);
    Route::get('/top-rated-products', [DashboardController::class, 'getTopRatedProducts']);
    Route::get('/top-rated-users', [DashboardController::class, 'getTopRatedUsers']);


    ///////////////////  FAVORITES  ///////////////////


    Route::get('/favorites', [FavoriteController::class, 'index']);


    ///////////////// PRODUCTS///////////////////////
    Route::apiResource('products', ProductController::class);
    Route::get('categories/{id}/attributes', [ProductController::class, 'getAttributesByCategory']);
    Route::patch('/products/{id}/state', [ProductController::class, 'StateOfProduct']);
    Route::Post('products/update/{product}', [ProductController::class, 'update']);


    Route::post('/products/{productId}/favorite', [FavoriteController::class, 'toggle']);

    ///////////////////  CATEGORY  ///////////////////
    // Route::apiResource('categories', CategoryController::class);
    Route::Post('categories/update/{category}', [CategoryController::class, 'update']);


    ///////////////////  MESSAGE  ///////////////////
    // ✅ Conversation APIs 
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show']);
    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy']);

    // ✅ Message APIs — reorder static routes FIRST
    Route::get('/messages/unread-count', [MessageController::class, 'unreadCount']);
    Route::post('/messages/mark-read/{conversationId}', [MessageController::class, 'markAsRead']);
    Route::get('/messages/{conversationId}', [MessageController::class, 'index']);
    Route::post('/messages/{conversationId}', [MessageController::class, 'store']);
    Route::delete('/messages/{messageId}', [MessageController::class, 'destroy']);


    // Route::apiResource('/messages', MessageController::class);

    Route::apiResource('reports', ReportController::class);
    Route::apiResource('reviews', ReviewController::class);

    ///////////////////  USERS  ///////////////////

    Route::apiResource('users', UserController::class);
    Route::put('users/{user}/status', [UserController::class, 'Status']);
    Route::post('users/update/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('bulk-delte-user', [UserController::class, 'bulkDelete']);

    Route::get('users/{user}/location', [UserController::class, 'userLocation']);
    Route::get('/profile', [UserController::class, 'profile']);
});


////////////////////  API FOR MOBILE   ////////////////////////////////

Route::prefix('v1/mobile')->group(function () {

    /////////////// PRODUCTS ///////////////////


    Route::apiResource('products', ProductController::class);
    Route::get('categories/{id}/attributes', [ProductController::class, 'getAttributesByCategory']);
    Route::patch('/products/{id}/state', [ProductController::class, 'StateOfProduct']);
    Route::Post('products/update/{product}', [ProductController::class, 'update']);
    Route::get('websiteProducts', [ProductController::class, 'websiteProducts']);
    Route::get('productImages/{id}', [ProductController::class, 'allImages']);



    /////////////// USERS ///////////////////

    Route::apiResource('users', UserController::class);
    Route::put('users/{user}/status', [UserController::class, 'Status']);
    Route::post('users/update/{user}', [UserController::class, 'update']);
    Route::delete('bulk-delete-user', [UserController::class, 'bulkDelete']);



    /////////////// CATEGORIES ///////////////////

    Route::Post('categories/update/{category}', [CategoryController::class, 'update']);
    Route::apiResource('categories', CategoryController::class);




    ///////////////////  FAVORITES  ///////////////////


    Route::post('/products/{productId}/favorite', [FavoriteController::class, 'toggle']);
    Route::get('/favorites', [FavoriteController::class, 'index']);





    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::get('/reviews/{review}', [ReviewController::class, 'show']);

    Route::get('/product-attributes', [ProductAttributeController::class, 'index']);
    Route::get('/product-attribute-values', [ProductAttributeValueController::class, 'index']);

    // Search route
    Route::get('/search/products', [ProductController::class, 'index']); // Use ?search=query

    // Optional filter-specific route if needed
    Route::get('/products/filter', [ProductController::class, 'index']); // Uses request filters


});
