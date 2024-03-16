<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $addresses = Address::all();
        return $addresses;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(AddressRequest $request)
    {
        $validated = $request->validated();
        $address = Address::create($validated);
        return $address;
    }


    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        return $address;

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(AddressRequest $request, Address $address)
    {
        $validated = $request->validated();
        $address->update($validated);
        return $address;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json([ "address deleted"]);
    }
}
