<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
//  use ImageManipulation;

    // ✅ Register new user using UserRequest and same logic as UserController
    public function register(UserRequest $request)
    {
        $validated = $request->validated();

        // Upload image
        // if ($request->hasFile('image')) {
        //     $this->storeImage($request, $validated, 'images/users', 'image');
        // }

        // Hash password if present
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        // Save user
        $user = User::create($validated);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user),
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

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
        ]);
    }

    // ✅ Get Authenticated User Profile
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // ✅ Logout (Optional for session-based)
    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
