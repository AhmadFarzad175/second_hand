<?php

namespace App\Http\Controllers;

use App\Http\Resources\WebsiteProductsResource;
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
    public function index(Request $request)
    {
        $user = Auth::user();
        $search = $request->input('search');

        // Step 1: Get the product IDs that the user has favorited
        $favoritedProductIds = DB::table('favorites')
            ->where('user_id', $user->id)
            ->pluck('product_id'); // Just get the product IDs

        // Step 2: Fetch those products with all needed relationships
        $favorites = Product::with(['images', 'favorites', 'user'])
            ->whereIn('id', $favoritedProductIds)
            ->orderBy('id', 'DESC')
            ->search($search)
            ->get();



        return WebsiteProductsResource::collection($favorites);
    }
}
