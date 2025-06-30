<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Models\Report;
use App\Models\Review;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats()
    {
        return response()->json([
            'total_products' => Product::count(),
            'total_users' => User::count(),
            'total_sales' => Product::where('state', 'sold')->sum('price'),
            'total_categories' => Category::count(),
        ]);
    }

    public function getRecentProducts()
    {
        return response()->json(
            Product::with(['category:id,name', 'user:id,name'])
                ->select(['id', 'name', 'category_id', 'price', 'user_id', 'state'])
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'category' => $product->category->name,
                        'price' => '$' . number_format($product->price, 2),
                        'seller' => $product->user->name,
                        'status' => $product->state,
                    ];
                })
        );
    }

    public function getRecentUsers()
    {
        return response()->json(
            User::select(['id', 'name', 'email', 'role', 'is_active'])
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'status' => $user->is_active ? 'active' : 'inactive',
                    ];
                })
        );
    }

    public function getReports()
    {
        return response()->json(
            Report::with(['user:id,name', 'product:id,name'])
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($report) {
                    return [
                        'id' => $report->id,
                        'product' => $report->product->name,
                        'reporter' => $report->user->name,
                        'reason' => $report->reason,
                        'date' => $report->created_at->format('Y-m-d'),
                    ];
                })
        );
    }

    public function getReviews()
    {
        return response()->json(
            Review::with(['user:id,name', 'product:id,name'])
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'product' => $review->product->name,
                        'reviewer' => $review->user->name,
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'date' => $review->created_at->format('Y-m-d'),
                    ];
                })
        );
    }

    public function getTopRatedProducts()
    {
        return response()->json(
            Product::with(['category:id,name'])
                ->select([
                    'products.id',
                    'products.name',
                    'products.category_id',
                    DB::raw('AVG(reviews.rating) as average_rating'),
                    DB::raw('COUNT(reviews.id) as reviews_count'),
                ])
                ->leftJoin('reviews', 'products.id', '=', 'reviews.product_id')
                ->groupBy('products.id', 'products.name', 'products.category_id')
                ->orderByDesc('average_rating')
                ->take(5)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'category' => $product->category->name,
                        'rating' => round($product->average_rating, 1) ?? 0,
                        'reviews' => $product->reviews_count,
                        'image' => $product->images->first()?->image_url ?? '/images/default-product.png',
                    ];
                })
        );
    }

    public function getTopRatedUsers()
    {
        return response()->json(
            User::select([
                'users.id',
                'users.name',
                'users.email',
                DB::raw('AVG(reviews.rating) as average_rating'),
                DB::raw('COUNT(DISTINCT products.id) as products_count'),
            ])
                ->leftJoin('products', 'users.id', '=', 'products.user_id')
                ->leftJoin('reviews', 'products.id', '=', 'reviews.product_id')
                ->groupBy('users.id', 'users.name', 'users.email')
                ->orderByDesc('average_rating')
                ->take(5)
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'rating' => round($user->average_rating, 1) ?? 0,
                        'products' => $user->products_count,
                        'image' => $user->image ?? '/avatars/default-user.png',
                    ];
                })
        );
    }
}
