<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReviewMobileController extends Controller
{
     // GET /api/mobile/products/{product_id}/reviews
     public function productReviews($product_id)
     {
         return response()->json(
             Review::where('product_id', $product_id)->latest()->get()
         );
     }

     // POST /api/mobile/reviews
     public function store(Request $request)
     {
         $validated = $request->validate([
             'user_id' => 'required|exists:users,id',
             'product_id' => 'required|exists:products,id',
             'rating' => 'required|integer|min:1|max:5',
             'comment' => 'nullable|string',
         ]);

         $review = Review::create($validated);
         return response()->json($review, 201);
     }
}
