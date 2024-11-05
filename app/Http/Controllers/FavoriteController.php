<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FavoriteRequest;

class FavoriteController extends Controller
{
    public function store(FavoriteRequest $request )
    {
        // $user = User::find(1);
        $user = User::find($request->validated('user_id'));
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // Attach the product to the user's favorites using the validated product_id
        $user->product()->attach($request->validated('product_id'));

        return response()->json(['message' => 'Product added to favorites']);
    }

    public function destroy(FavoriteRequest $request, Product $product)
    {
        // Retrieve the authenticated user
        $user = User::find($request->validated('user_id'));

        // Detach the specified product from the user's favorites
        $user->product()->detach($product->id);

        return response()->json(['message' => 'Product removed from favorites']);
    }
}
