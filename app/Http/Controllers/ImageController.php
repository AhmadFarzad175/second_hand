<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::paginate(10);
        return ImageResource::collection($images);

    }

    public function store(ImageRequest $request)
    {
        $validated=$request->validated();
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('images', 'public');
            $validated['image_url']=$imagePath;
        }

        Image::create($validated);

        return response(['success' =>'image inserted successfully']);
    }


    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return $image;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ImageRequest $request, Image $image)
    {

        $validated = $request->validated();
        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('images', 'public');
            $validated['image_url'] = $imagePath;
        }

        $image->update($validated);

        return response()->json(['success'=> 'updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image){
        $image->delete();
        return response()->json(['success' =>'image deleted successfully'] );
    }
}
