<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::paginate(10); // Paginate images for better performance
        return ImageResource::collection($images);
    }

    /**
     * Store a new image resource in storage.
     */
    public function store(ImageRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image_url')) {
            // Store the image and save the path
            $imagePath = $request->file('image_url')->store('images', 'public');
            $validated['image_url'] = $imagePath;
        }

        // Ensure to include product_id in the validated data
        $validated['product_id'] = $request->input('product_id'); // Ensure this is sent in the request

        $image = Image::create($validated);

        return response()->json(['success' => 'Image inserted successfully', 'data' => new ImageResource($image)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return new ImageResource($image);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImageRequest $request, Image $image)
    {
        $validated = $request->validated();

        if ($request->hasFile('image_url')) {
            // Delete the old image if it exists
            if ($image->image_url && Storage::disk('public')->exists($image->image_url)) {
                Storage::disk('public')->delete($image->image_url);
            }

            // Store the new image
            $imagePath = $request->file('image_url')->store('images', 'public');
            $validated['image_url'] = $imagePath;
        }

        $image->update($validated);

        return response()->json(['success' => 'Image updated successfully', 'data' => new ImageResource($image)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // Delete the image file from storage if it exists
        if ($image->image_url && Storage::disk('public')->exists($image->image_url)) {
            Storage::disk('public')->delete($image->image_url);
        }

        $image->delete();

        return response()->json(['success' => 'Image deleted successfully']);
    }

    /**
     * Get all images for a specific product.
     */
    public function getImagesByProduct($productId)
    {
        $images = Image::where('product_id', $productId)->get(); // Fetch images associated with the product
        return ImageResource::collection($images);
    }
}
