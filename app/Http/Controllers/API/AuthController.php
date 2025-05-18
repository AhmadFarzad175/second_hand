<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // User Registration
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'location' => 'required|array',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'location' => $request->location,
        ]);

        return response()->json(['message' => 'User registered successfully!']);
    }

    // User Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('MobileApp')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    // Google Login Redirect (optional - if you want to redirect user to Google)
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }

    // Handle Google OAuth callback
    public function handleGoogleCallback()
    {
        // Get Google user info (stateless for API)
        $googleUser = Socialite::driver('google')->stateless()->user();


        // Find or create user by email
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName() ?? 'Unknown User',
                'password' => bcrypt(Str::random(16)), // random password since user logs in via Google
                'image' => $googleUser->getAvatar(),
                'location' => ['lat' => 0.0, 'lng' => 0.0], // default location if needed
            ]
        );

        // Log user in
        Auth::login($user);

        // Create token for API
        $token = $user->createToken('GoogleAuthToken')->plainTextToken;

        return response()->json([
            'message' => 'Logged in via Google successfully.',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Get User Profile
    public function userProfile(Request $request)
    {
        return response()->json($request->user());
    }

    // Logout User
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}


