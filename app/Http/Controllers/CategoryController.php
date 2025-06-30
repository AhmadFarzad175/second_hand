<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\ImageManipulation;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryAttributesResource;

class CategoryController extends Controller
{
    use ImageManipulation;

//     public function __construct()
// {
//     $this->middleware('can:viewCategory')->only(['index', 'show']);
//     $this->middleware('can:createCategory')->only(['store']);
//     $this->middleware('can:editCategory')->only(['update']);
//     $this->middleware('can:deleteCategory')->only(['destroy']);
// }
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage');
        $search = $request->input('search');

        $category = Category::query()->withCount('products')->search($search);

        $category = $perPage
            ? $category->latest()->paginate($perPage)
            : $category->latest()->get();

        return CategoryResource::collection($category);
    }



    /**
     * Store a new category.
     */
    // public function store(CategoryRequest $request)
    // {
    //     $validated = $request->validated();
    //     $request->hasFile('image') ? $this->storeImage($request, $validated, "storage/images/categories", 'image') : null;
    //     Category::create($validated);
    //     return response()->json(['success' => 'Category created successfully']);
    // }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }
    // inside store() and update() methods of CategoryController

public function store(CategoryRequest $request)
{
    $validated = $request->validated();

    if ($request->hasFile('image')) {
        $this->storeImage($request, $validated, 'images/categories', 'image');
    }

    Category::create($validated);

    return response()->json(['success' => 'Category created successfully']);
}

public function update(CategoryRequest $request, Category $category): JsonResponse
{
    $validated = $request->validated();

    if ($request->hasFile('image')) {
        $this->updateImage($category, $request, $validated, 'images/categories', 'image');
    }

    $category->update($validated);

    return response()->json(['success' => 'Category updated successfully']);
}

public function destroy(Category $category): JsonResponse
{
    $this->deleteImage($category, 'images/categories', 'image');
    $category->delete();

    return response()->json(['success' => 'Category deleted successfully']);
}


public function CategoryWithoutImage()
{
    $categories = Category::select('id', 'name')->get();

    return response()->json([
        'data' => $categories
    ]);
}

    /**
     * Update the specified category.
     */
    // public function update(CategoryRequest $request, Category $category): JsonResponse
    // {
    //     $validated = $request->validated();
    //     $request->hasFile('image') && $this->updateImage($category, $request, $validated, 'images/categories', 'image');
    //     $category->update($validated);
    //     return response()->json(['success' => 'Category updated successfully']);
    // }

    /**
     * Remove the specified category from storage.
     */
    // public function destroy(Category $category): JsonResponse
    // {
    //     $this->deleteImage($category, 'images/categories', 'image');
    //     $category->delete();
    //     return response()->json(['success' => 'Category deleted successfully']);
    // }
//     public function getAttributes(Category $category)
// {
//     $category->load('attributes', 'parent.attributes');

//     $attributes = $category->attributes;

//     if ($category->parent) {
//         $attributes = $attributes->merge($category->parent->attributes);
//     }

//     return CategoryAttributesResource::collection($attributes);
// }

}

// Developed By: Fahim Rahimi
// Reach Me: fahimrahimi305@gmail.com
