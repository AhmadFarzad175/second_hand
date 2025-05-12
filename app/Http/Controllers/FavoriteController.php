<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum'); // or 'auth:api' if using tokens
    // }

    // Toggle favorite status



    // Toggle favorite status
    // public function toggle(Request $request, $productId)
    // {
    //     // $user = Auth::user();
    //     $userId = $request->input('user_id'); // Or you can pass user_id as part of the URL, depending on your structure

    //     if (!$userId) {
    //         return response()->json(['message' => 'User ID is required'], 400); // If no user_id is provided
    //     }

    //     $product = Product::find($productId);

    //     if (!$product) {
    //         return response()->json(['message' => 'Product not found'], 404); // Product doesn't exist
    //     }
    //     // $product = Product::findOrFail($productId);

    //     // Manually check if the product is already favorited
    //     $favoriteExists = DB::table('favorites')
    //         // ->where('user_id', $user->id)
    //         ->where('user_id', $userId)
    //         ->where('product_id', $productId)
    //         ->exists();

    //     if ($favoriteExists) {
    //         // Remove from favorites (detach)
    //         DB::table('favorites')
    //             // ->where('user_id', $user->id)
    //             ->where('user_id', $userId)
    //             ->where('product_id', $productId)
    //             ->delete();

    //         return response()->json(['message' => 'Product removed from favorites', 'status' => 'removed']);
    //     } else {
    //         // Add to favorites (attach)
    //         DB::table('favorites')->insert([
    //             // 'user_id' => $user->id,
    //             'user_id' => $userId,
    //             'product_id' => $productId,
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ]);

    //         return response()->json(['message' => 'Product added to favorites', 'status' => 'added']);
    //     }
    // }
    // Example method to toggle a favorite
public function toggle(Request $request, $productId)
{
    $userId = $request->input('user_id'); // Or pass user_id through headers/query params

    // Check if user_id and product exist
    if (!$userId) {
        return response()->json(['message' => 'User ID is required'], 400);
    }

    $product = Product::find($productId);
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Check if the favorite exists in the database
    $favoriteExists = DB::table('favorites')
        ->where('user_id', $userId)
        ->where('product_id', $productId)
        ->exists();

    if ($favoriteExists) {
        // Remove from favorites
        DB::table('favorites')
            ->where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Product removed from favorites', 'status' => 'removed']);
    } else {
        // Add to favorites
        DB::table('favorites')->insert([
            'user_id' => $userId,
            'product_id' => $productId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Product added to favorites', 'status' => 'added']);
    }
}


    // List all favorites of authenticated user
    public function index()
    {
        $user = Auth::user();

        // Get all products the user has favorited
        $favorites = DB::table('favorites')
            ->join('products', 'favorites.product_id', '=', 'products.id')
            ->where('favorites.user_id', $user->id)
            ->select('products.*')  // You can select specific columns here
            ->get();

        return response()->json($favorites);
    }
}
