<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Traits\ImageManipulation;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use ImageManipulation;

    // ✅ Register new user using UserRequest and same logic as UserController
    public function register(UserRequest $request)
    {
        $validated = $request->validated();

        // Upload image
        if ($request->hasFile('image')) {
            $this->storeImage($request, $validated, 'images/users', 'image');
        }

        // Hash password if present
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        // Save user
        $user = User::create($validated);
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }


    // ✅ Login user (without Sanctum)
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'token' => $token,
        ]);
    }
    // public function redirectToGoogle()
    // {
    //     // Redirect the user to Google's OAuth page
    //     return Socialite::driver('google')->stateless()->redirect();
    // }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->stateless() // Add this for API usage
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'image' => $googleUser->avatar, // Stores Google profile image URL
                    'google_id' => $googleUser->id,
                    'password' => Hash::make(Str::random(24)),
                    'email_verified_at' => now(), // Mark email as verified
                    'location' => json_encode([]), // Empty JSON array as default
                    'role' => 'user' // Default role
                ]
            );
            $token = $user->createToken('google-token')->plainTextToken;

            // Return JSON instead of redirecting
            return response()->json([
                'token' => $token,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Google authentication failed',
                'message' => $e->getMessage()
            ], 401);
        }
    }

    // public function handleGoogleCallback()
    // {
    //     dd(Request()->all());
    //     try {
    //         $googleUser = Socialite::driver('google')->stateless()->user();

    //         $user = User::where('email', $googleUser->getEmail())
    //             ->orWhere('google_id', $googleUser->getId())
    //             ->first();

    //         if (!$user) {
    //             $user = User::create([
    //                 'name' => $googleUser->getName(),
    //                 'email' => $googleUser->getEmail(),
    //                 'google_id' => $googleUser->getId(),
    //                 'password' => Hash::make(Str::random(24)),
    //                 'image' => $googleUser->getAvatar(),
    //                 'location' => json_encode(['latitude' => 0, 'longitude' => 0]),
    //             ]);
    //         }

    //         Auth::login($user);
    //     $token = $user->createToken('authToken')->plainTextToken;


    //         return response()->json([
    //             'message' => 'Login via Google successful',
    //             'user' => new UserResource($user),
    //         'token' => $token,

    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Google login failed',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }


    // ✅ Get Authenticated User Profile
    // public function profile(Request $request)
    // {
    //     return response()->json($request->user());
    // }

    // ✅ Logout (Optional for session-based)
    // public function logout(Request $request)
    // {
    //     $request->user()->currentAccessToken()->delete();
    //     return response()->json(['message' => 'Logged out successfully']);
    // }

    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
