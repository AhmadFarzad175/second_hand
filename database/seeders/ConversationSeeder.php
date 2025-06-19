<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConversationSeeder extends Seeder
{
    // Common buyer phrases for marketplace
    private $buyerPhrases = [
        "Is this {product} still available?",
        "What's your best price for the {product}?",
        "Can you do {price} for it?",
        "Where can I see the {product}?",
        "Can you share more photos of the {product}?",
        "What's the exact condition of the {product}?",
        "Does the {product} have any defects?",
        "Why are you selling this {product}?",
        "Can I test the {product} before buying?",
        "Would you accept {price} for the {product}?",
        "When can I pick up the {product}?",
        "Do you deliver the {product}?",
        "Is the price for {product} negotiable?",
        "What payment methods do you accept for {product}?",
        "Is this the final price for {product}?"
    ];

    // Common seller responses
    private $sellerPhrases = [
        "Yes, the {product} is still available",
        "Price is firm at {price}",
        "I can do {price} for the {product}",
        "I'm in {location} if you want to see it",
        "Here are more photos of the {product}",
        "The {product} is in {condition} condition",
        "No defects, the {product} works perfectly",
        "I'm upgrading to a newer {product}",
        "Sure, we can meet at {location} to test it",
        "Sorry, {price} is too low for this {product}",
        "The {product} is available after {time}",
        "Delivery possible for extra {delivery_fee}",
        "Price is slightly negotiable for this {product}",
        "Cash on pickup preferred for the {product}",
        "Yes, this is the final price for the {product}"
    ];

    public function run(): void
    {
        // Clear existing data
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Message::truncate();
        Conversation::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Get or create test users (minimum 10)
        $users = User::count() <= 10
            ? User::inRandomOrder()->take(10)->get()
            : User::factory(10)->create();

        // Get active products (minimum 20)
        $products = Product::where('state', 'available')
            ->inRandomOrder()
            ->take(20)
            ->get();

        if ($products->count() < 20) {
            $products = Product::factory(20)->create(['state' => 'available']);
        }

        // Create unique conversations
        $conversationCount = 0;
        $maxConversations = 30;
        $attempts = 0;
        $maxAttempts = 200; // Safety limit

        while ($conversationCount < $maxConversations && $attempts < $maxAttempts) {
            $attempts++;

            // Get random product and its seller
            $product = $products->random();
            $seller = $product->user;

            // Get random buyer (different from seller)
            $buyer = $users->where('id', '!=', $seller->id)->random();

            // Create ordered conversation key
            $userOneId = min($seller->id, $buyer->id);
            $userTwoId = max($seller->id, $buyer->id);
            $conversationKey = "{$userOneId}-{$userTwoId}";

            // Skip if conversation already exists
            if (Conversation::where('user_one_id', $userOneId)
                ->where('user_two_id', $userTwoId)
                ->exists()) {
                continue;
            }

            // Create the conversation
            $conversation = Conversation::create([
                'user_one_id' => $userOneId,
                'user_two_id' => $userTwoId,
                'created_at' => now()->subDays(rand(0, 30)),
            ]);

            $conversationCount++;

            // Create messages (3-10 per conversation)
            $messageCount = rand(3, 10);
            $isBuyer = true; // First message always from buyer

            for ($j = 0; $j < $messageCount; $j++) {
                $senderId = $isBuyer ? $buyer->id : $seller->id;
                $message = $this->generateMessage($isBuyer, $product);

                Message::create([
                    'conversation_id' => $conversation->id,
                    'sender_id' => $senderId,
                    'message' => $message,
                    'is_read' => $j === $messageCount - 1 ? false : true,
                    'created_at' => $conversation->created_at->addMinutes(rand(5, 1440)),
                ]);

                $isBuyer = !$isBuyer; // Alternate sender
            }

            // Update conversation timestamp
            $conversation->update([
                'updated_at' => $conversation->messages()->latest()->first()->created_at
            ]);
        }
    }

    protected function generateMessage(bool $isBuyer, Product $product): string
    {
        $template = $isBuyer
            ? $this->buyerPhrases[array_rand($this->buyerPhrases)]
            : $this->sellerPhrases[array_rand($this->sellerPhrases)];

        return $this->replacePlaceholders($template, $product);
    }

    protected function replacePlaceholders(string $message, Product $product): string
    {
        $replacements = [
            '{product}' => $product->name,
            '{price}' => number_format($product->net_price * (rand(70, 90) / 100), 2),
            '{location}' => ['Downtown', 'West Side', 'North Area', 'East District'][rand(0, 3)],
            '{condition}' => ['excellent', 'good', 'fair', 'like new'][rand(0, 3)],
            '{time}' => ['5pm', 'noon', '10am', 'weekend'][rand(0, 3)],
            '{delivery_fee}' => number_format(rand(5, 20), 2),
        ];

        return str_replace(
            array_keys($replacements),
            array_values($replacements),
            $message
        );
    }
}
