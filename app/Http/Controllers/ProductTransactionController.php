<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductTransactionResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Product;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductTransactionController extends Controller
{

    // Get transactions (filterable by product_id)
    public function index(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'seller_id' => 'nullable|exists:users,id',
            'buyer_id' => 'nullable|exists:users,id',
        ]);

        $query = ProductTransaction::with(['product', 'buyer', 'seller'])
            ->latest();

        if (isset($validated['product_id'])) {
            $query->where('product_id', $validated['product_id']);
        }

        if (isset($validated['seller_id'])) {
            $query->where('seller_id', $validated['seller_id']);
        }

        if (isset($validated['buyer_id'])) {
            $query->where('buyer_id', $validated['buyer_id']);
        }

        $transactions = $query->paginate(10);

        return response()->json([
            'data' => $transactions
        ]);
    }


    // Create a new transaction
    public function store(Request $request)
    {
        $product = Product::findOrFail($request->product_id);

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'buyer_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'quantity' => "required|integer|min:1|max:{$product->quantity}",
            'message' => 'nullable|string', // Make message optional
        ]);

        // Verify the product belongs to the seller
        if ($product->user_id != $validated['seller_id']) {
            return response()->json([
                'message' => 'This product does not belong to the specified seller'
            ], 403);
        }

        // Check product availability
        if ($product->quantity < $validated['quantity']) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        // Prevent buying your own product
        if ($validated['buyer_id'] === $validated['seller_id']) {
            return response()->json([
                'message' => 'You cannot request to buy your own product'
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Create the transaction
            $transaction = ProductTransaction::create([
                'product_id' => $validated['product_id'],
                'buyer_id' => $validated['buyer_id'],
                'seller_id' => $validated['seller_id'],
                'quantity' => $validated['quantity'],
                'status' => 'pending',
            ]);

            // Find or create conversation between buyer and seller
            $conversation = Conversation::firstOrCreate(
                [
                    'user_one_id' => min($validated['buyer_id'], $validated['seller_id']),
                    'user_two_id' => max($validated['buyer_id'], $validated['seller_id']),
                ],
                [
                    'product_id' => $validated['product_id'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            // Include product reference in the message
            $fullMessage = "product: {$product->name}\n\n " . ($validated['message'] ?? '');

            // Add message if provided
            if (!empty($validated['message'])) {
                Message::create([
                    'conversation_id' => $conversation->id,
                    'sender_id' => $validated['buyer_id'],
                    'message' => $fullMessage,
                    'is_read' => false,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Transaction created successfully',
                'data' => [
                    'transaction' => $transaction,
                    'conversation_id' => $conversation->id,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create transaction',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    // Get pending transactions for a seller
    public function pending(Request $request)
    {
        $request->validate([
            'seller_id' => 'required|exists:users,id',
        ]);

        $transactions = ProductTransaction::with(['product', 'buyer'])
            ->where('seller_id', $request->seller_id)
            ->where('status', 'pending')
            ->latest()
            ->get();

        return ProductTransactionResource::collection($transactions);
    }

    // Update transaction status
    public function updateStatus(Request $request, ProductTransaction $transaction)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['completed', 'cancelled'])],
        ]);

        // Verify the authenticated user is the seller
        if (auth()->id() != $transaction->seller_id) {
            return response()->json([
                'message' => 'You are not authorized to update this transaction'
            ], 403);
        }

        // Check if transaction is already completed/cancelled
        if ($transaction->status != 'pending') {
            return response()->json([
                'message' => 'Transaction status cannot be changed anymore'
            ], 422);
        }

        try {
            DB::beginTransaction();

            $transaction->update(['status' => $validated['status']]);

            // Update product stock if completed
            if ($validated['status'] === 'completed') {
                $transaction->product->decrement('quantity', $transaction->quantity);

                // Mark product as sold if quantity reaches 0
                if ($transaction->product->quantity <= 0) {
                    $transaction->product->update(['state' => 1]); // 1 = sold
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Transaction status updated successfully',
                'data' => $transaction
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update transaction status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete a transaction
    // public function destroy(ProductTransaction $transaction)
    // {
    //     // Verify the authenticated user is either buyer or seller
    //     if (!in_array(auth()->id(), [$transaction->buyer_id, $transaction->seller_id])) {
    //         return response()->json([
    //             'message' => 'You are not authorized to delete this transaction'
    //         ], 403);
    //     }

    //     // Only allow deletion of pending transactions
    //     if ($transaction->status != 'pending') {
    //         return response()->json([
    //             'message' => 'Only pending transactions can be deleted'
    //         ], 422);
    //     }

    //     $transaction->delete();

    //     return response()->json([
    //         'message' => 'Transaction deleted successfully'
    //     ]);
    // }
}

    // public function confirmSale(ProductTransaction $transaction)
    // {
    //     // Verify seller owns the product
    //     if ($transaction->product->user_id !== auth()->id()) {
    //         abort(403);
    //     }

    //     DB::transaction(function () use ($transaction) {
    //         $transaction->update(['status' => 'completed']);

    //         $product = $transaction->product;
    //         $product->decrement('stock', $transaction->quantity);
    //         $product->decrement('reserved_stock', $transaction->quantity);

    //         if ($product->stock <= 0) {
    //             $product->update(['status' => 'sold']);
    //         }
    //     });

    //     return redirect()->back()->with('success', 'Sale confirmed');
    // }
