<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ImageManipulation;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ImageManipulation;
    public function __construct()
    {
        // $this->middleware('can:view product');
    //     $this->middleware('can:viewUser')->only(['index', 'show']);
    //     $this->middleware('can:createUser')->only(['store']);
    //     $this->middleware('can:editUser')->only(['update', 'Status']);
    //     $this->middleware('can:deleteUser')->only(['destroy', 'bulkDelete']);
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {

        $perPage = $request->input('perPage');
        $search = $request->input('search');
        $users = User::query()->search($search);
        $users = $perPage ? $users->latest()->paginate($perPage) : $users->latest()->get();

        return UserResource::collection($users);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();
        // Create the user with validated data
        $request->hasFile('image') ? $this->storeImage($request, $validated, 'images/users', "image") : null;
        if ($validated['password']) {
            $validated['password'] = Hash::make($request->password);
        }
        // dd($validated['image']);
        $user = User::create($validated);
        // Assign a role (e.g. 'admin' or 'customer')
$user->assignRole($validated['role']);


        // Return a success response with status code 201
        return response()->json(['message' => 'User created successfully', 'user' => new UserResource($user)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::with('products')->findOrFail($id);
        return ProfileUserResource::make($user);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $validated = $request->validated();

        // Handle optional image update
        $this->updateImage($user, $request, $validated, 'images/users', 'image');

        // 🔐 Only update password if it's not null or empty
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']); // prevent null overwrite
        }

        // 🌍 Handle location: decode and validate
        if (!empty($validated['location'])) {
            $location = json_decode($validated['location'], true);

            // If latitude or longitude is missing or empty, don't update
            if (empty($location['latitude']) || empty($location['longitude'])) {
                unset($validated['location']);
            }
        }
        // dd($validated);
        $user->update($validated);

        // ✅ Assign or update user role
    if (!empty($validated['role'])) {
        $user->syncRoles($validated['role']); // replaces old role(s)
    }


        return new UserResource($user);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->deleteImage($user, 'images/users', 'image');
        $user->delete();
        return response()->json(['success' => 'User deleted successfully']);
    }
    public function Status(Request $request, User $user)
    {
        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $user->is_active = $request->is_active; // Assuming 'status' is a boolean (true/false)
        $user->save();

        return response()->json([
            'message' => 'User status updated successfully',
        ]);
    }
    // public function bulkDelete(Request $request)
    // {
    //     $user = $request->validated->input('userIds');
    //     $userIds = $request["userIds"];
    //     if (!empty($userIds)) {
    //         return response()->json(['massage' => 'IDs not found']);
    //     }
    //     foreach ($userIds as $id) {
    //         $user = User::find($id);
    //         $this->deleteImage($user, 'images/users', 'image');
    //     }
    //     User::whereIn('id', $request->userIds)->delete();
    //     return response()->noContent();
    // }
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'userIds' => 'required|array',
            'userIds.*' => 'integer|exists:users,id',
        ]);

        $userIds = $request->input('userIds');

        if (empty($userIds)) {
            return response()->json(['message' => 'IDs not found'], 400);
        }

        $users = User::whereIn('id', $userIds)->get();

        foreach ($users as $user) {
            $this->deleteImage($user, 'images/users', 'image');
        }

        User::whereIn('id', $userIds)->delete();

        return response()->noContent();
    }




    public function userLocation($id)
    {
        $user = User::findOrFail($id);

        // If 'location' is a normal column (string, object, etc.)
        return response()->json([
            'location' => $user->location,
        ]);
    }

    public function profile()
    {
        $id = Auth::id() ?? 1;
        $user = User::with('products')->findOrFail($id);
        return ProfileUserResource::make($user);
    }
}

// Developed By: Fahim Rahimi
// Reach Me: fahimrahimi305@gmail.com
