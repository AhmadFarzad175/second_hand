<?php

namespace App\Http\Controllers\Mobile;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserMobileController extends Controller
{
    public function show($id)
    {
        $user = User::withCount(['products', 'favorites'])->findOrFail($id);
        return response()->json($user);
    }
}
