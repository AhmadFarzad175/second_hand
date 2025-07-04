<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the reviews.
     */
    public function index()
    {
        $reviews = Review::with(['user', 'product'])->latest()->paginate(10);
        return ReviewResource::collection($reviews);
    }

    /**
     * Store a newly created review.
     */
    public function store(ReviewRequest $request): JsonResponse
    {
        $userId = auth()->id() ?? $request->user_id; // fallback if not logged in

        // $userId = Auth::id();
        $productId = $request->product_id;

        // Prevent duplicate reviews per user per product
        $exists = Review::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You have already reviewed this product.',
            ], 409); // Conflict
        }

        // Create review
        $review = Review::create([
            'user_id'    => $userId,
            'product_id' => $productId,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
        ]);

        return response()->json([
            'message' => 'Review created successfully.',
            'review'  => new ReviewResource($review),
        ], 201);
    }

    /**
     * Display a single review.
     */
    public function show(Review $review): ReviewResource
    {
        return new ReviewResource($review->load('user', 'product'));
    }

    /**
     * Update the specified review.
     */
    public function update(ReviewRequest $request, Review $review): JsonResponse
    {
        $review->update($request->validated());

        return response()->json([
            'message' => 'Review updated successfully.',
            'review'  => new ReviewResource($review),
        ]);
    }

    /**
     * Remove the specified review.
     */
    // public function destroy(Review $review): JsonResponse
    // {

    //     $review->delete();

    //     return response()->json([
    //         'message' => 'Review deleted successfully.',
    //     ]);
    // }
 public function destroy(Review $review): JsonResponse
{
    $review->delete();

    return response()->json([
        'message' => 'Review deleted successfully.',
    ]);
}


}
