<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductMobileController extends Controller
{
    public function home()
    {
        return response()->json([
            'latest_products' => Product::latest()->take(10)->get(),
            'categories' => Category::withCount('products')->get(),
        ]);
    }

    // GET /api/mobile/products
    public function productList(Request $request)
    {
        $query = Product::query();

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('location')) {
            $query->where('description', 'LIKE', '%' . $request->location . '%');
        }

        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('net_price', [$request->min_price, $request->max_price]);
        }

        if ($request->filled('color')) {
            $query->where('color', $request->color);
        }

        return response()->json($query->latest()->paginate(10));
    }

    // GET /api/mobile/products/{id}
    public function productDetail($id)
    {
        $product = Product::with(['category'])->findOrFail($id);
        return response()->json($product);
    }
}
