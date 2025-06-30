<?php

use App\Http\Controllers\APIForMobile\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// // routes/web.php
// Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
// Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{any}', function () {
    return view('welcome'); // Serve React app
})->where('any', '.*');

// Password reset routes
Route::get('/reset-password/{token}', function ($token) {
    return response()->json([
        'message' => 'Password reset token verification endpoint',
        'token' => $token
    ]);
})->name('password.reset');


// Catch-all for React
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
