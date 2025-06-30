<?php

namespace App\Http\Controllers\APIForMobile;

use Google_Client;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\ImageManipulation;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;
use Spatie\FlareClient\Http\Client;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Notifications\ResetPassword;




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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'image' => asset('storage/'.$user->image), // or asset('storage/'.$user->image) if needed
'role' => $user->getRoleNames()->first(),
'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
            'token' => $token,
        ]);
    }


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







    public function googleLogin(Request $request)
    {
        Log::info('Google login attempt', ['input' => $request->all()]);

        $idToken = $request->input('token');
        Log::info('Received token', ['token' => $idToken]);

        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($idToken);
        Log::info('Payload', ['payload' => $payload]);

        if ($payload) {
            $email = $payload['email'];
            $name = $payload['name'];
            $picture = $payload['picture'] ?? "dsvsdkfjsdafasfa.png"; // Get profile picture

            Log::info('User data', ['email' => $email, 'name' => $name]);

            try {
                $user = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name' => $name,
                        'password' => bcrypt(uniqid()),
                        'image' => $picture,
                        'email_verified_at' => now(),
                        'location' => json_encode([]), // Default empty JSON
                        'role' => 'user', // Default role
                        'is_active' => true, // Default active status
                        // Other fields can remain null
                    ]
                );
                Log::info('User processed', ['user' => $user]);

                // Auth::login($user);
                $token = $user->createToken('authToken')->plainTextToken;


                return response()->json([
                    'message' => 'Logged in successfully',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'image' => $user->image, // or asset('storage/'.$user->image) if needed
                        'role' => $user->role, // returns the first role name
                        'permissions' => $user->getAllPermissions()->pluck('name'), // returns array of permission names
                    ],
                    'token' => $token,
                ]);
            } catch (\Exception $e) {
                Log::error('User creation failed', ['error' => $e->getMessage()]);
                return response()->json(['error' => 'User creation failed'], 500);
            }
        } else {
            Log::error('Invalid token');
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }

    // Fixed password reset methods
   public function sendResetLink(Request $request)
{
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    // API-friendly response
    if ($status === Password::RESET_LINK_SENT) {
        return response()->json([
            'message' => __($status),
            'status' => 'success'
        ]);
    }

    return response()->json([
        'message' => __($status),
        'status' => 'error'
    ], 400);
}

public function resetPassword(Request $request)
{
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response()->json([
            'message' => __($status),
            'status' => 'success'
        ]);
    }

    return response()->json([
        'message' => __($status),
        'status' => 'error'
    ], 400);
}
}
