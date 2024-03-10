<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // $perPage = $request->input('perPage');
        // $search = $request->input('search');
        // $users = User::with(['product','report','address','message','favorite','review'])->search($search);
        // $users = $perPage ? $users->latest()->paginate($perPage) : $users->latest()->get();

        // return UserResource::collection($users);
        $users = User::all();
        return response()->json($users);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        // User::create($request->validated());
        // return response()->json('success', 'user created successfully');
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
        $user->update($request->validated());
        return response()->json('success', 'user updated succsessfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json('success', 'user deleted successfully');
    }
}
