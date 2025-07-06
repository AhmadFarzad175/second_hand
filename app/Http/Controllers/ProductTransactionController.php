<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductTransactionController extends Controller
{
    public function reserveProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1|max:' . $product->stock,
        ]);

        // Create transaction record
        $transaction = ProductTransaction::create([
            'product_id' => $product->id,
            'buyer_id' => auth()->id(),
            'seller_id' => $product->user_id,
            'quantity' => $validated['quantity'],
            'status' => 'pending'
        ]);

        // Update product
        $product->increment('reserved_stock', $validated['quantity']);

        return redirect()->back()->with('success', 'Product reserved for negotiation');
    }

    public function confirmSale(ProductTransaction $transaction)
    {
        // Verify seller owns the product
        if ($transaction->product->user_id !== auth()->id()) {
            abort(403);
        }

        DB::transaction(function () use ($transaction) {
            $transaction->update(['status' => 'completed']);

            $product = $transaction->product;
            $product->decrement('stock', $transaction->quantity);
            $product->decrement('reserved_stock', $transaction->quantity);

            if ($product->stock <= 0) {
                $product->update(['status' => 'sold']);
            }
        });

        return redirect()->back()->with('success', 'Sale confirmed');
    }
}
