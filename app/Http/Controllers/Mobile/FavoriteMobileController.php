<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FavoriteMobileController extends Controller
{
     // POST /api/mobile/favorites
     public function store(Request $request)
     {
         $request->validate([
             'user_id' => 'required|exists:users,id',
             'product_id' => 'required|exists:products,id',
         ]);

         $favorite = Favorite::create([
             'user_id' => $request->user_id,
             'product_id' => $request->product_id,
         ]);

         return response()->json($favorite, 201);
     }

     // DELETE /api/mobile/favorites
     public function destroy(Request $request)
     {
         $request->validate([
             'user_id' => 'required|exists:users,id',
             'product_id' => 'required|exists:products,id',
         ]);

         Favorite::where('user_id', $request->user_id)
             ->where('product_id', $request->product_id)
             ->delete();

         return response()->json(['message' => 'Unfavorited']);
     }

     // GET /api/mobile/users/{user_id}/favorites
     public function userFavorites($user_id)
     {
         $favorites = Favorite::with('product')
             ->where('user_id', $user_id)
             ->get();

         return response()->json($favorites);
     }
}
