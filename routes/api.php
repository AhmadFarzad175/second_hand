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


Route::post('/products/{product}/favorite', [FavoriteController::class, 'store'])->name('favorites.store');
Route::delete('/products/{product}/favorite', [FavoriteController::class, 'destroy'])->name('favorites.destroy');


Route::apiResource('users', UserController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('categories', CategoryController::class);
Route::Post('categories/update/{category}',[CategoryController::class, 'update']);
Route::apiResource('messages', MessageController::class);
Route::apiResource('reports', ReportController::class);
Route::apiResource('reviews', ReviewController::class);
Route::put('images/update/{id}',[ImageController::class, 'update']);
Route::apiResource('images' ,ImageController::class);
Route::apiResource('product-attributes', ProductAttributeController::class);
Route::apiResource('product-attribute-values', ProductAttributeValueController::class);



Route::post('/users/{user}/status', [UserController::class, 'Status']);
Route::delete('bulk-delte-user',[UserController::class, 'bulkDelete']);

