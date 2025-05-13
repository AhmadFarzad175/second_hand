<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{

    public function toggle(Request $request, $productId)
    {
        // Get the authenticated user
        $user = Auth::user();
        $user = User::find(1);

        // Check if the user already has this product favorite
        $isFavorite = $user->favorites()->where('product_id', $productId)->exists();

        if ($isFavorite) {
            // Remove from favorites
            $user->favorites()->detach($productId);
            return response()->json([
                'message' => 'Product removed from favorites',
                'isFavorite' => false
            ]);
        } else {
            // Add to favorites
            $user->favorites()->attach($productId);
            return response()->json([
                'message' => 'Product added to favorites',
                'isFavorite' => true
            ]);
        }
    }


    // List all favorites of authenticated user
    public function index()
    {
        $user = Auth::user();
        $user = User::find(1);

        // Get all products the user has favorited
        $favorites = DB::table('favorites')
            ->join('products', 'favorites.product_id', '=', 'products.id')
            ->where('favorites.user_id', $user->id)
            ->select('products.*')  // You can select specific columns here
            ->get();

        return response()->json($favorites);
    }
}
