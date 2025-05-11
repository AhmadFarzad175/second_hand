<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ImageManipulation;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ImageManipulation;
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

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }
        // dd($validated['image']);
        $user = User::create($validated);


        // Return a success response with status code 201
        return response()->json(['message' => 'User created successfully', 'user' => new UserResource($user)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return UserResource::make($user);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        // $user = User::find($id);
        $validated = $request->validated();
        // dd($request->input());
        $this->updateImage($user, $request, $validated, 'images/users', "image");

        $user->update($validated);

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
    public function bulkDelete(Request $request)
    {
        $user = $request->validated->input('userIds');
        $userIds = $request["userIds"];
        if (!empty($userIds)) {
            return response()->json(['massage' => 'IDs not found']);
        }
        foreach ($userIds as $id) {
            $user = User::find($id);
            $this->deleteImage($user, 'images/users', 'image');
        }
        User::whereIn('id', $request->userIds)->delete();
        return response()->noContent();
    }
}

// Developed By: Fahim Rahimi
// Reach Me: fahimrahimi305@gmail.com
//
