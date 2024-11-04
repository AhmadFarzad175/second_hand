<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(): JsonResponse
    {
        $categories = Category::paginate(10);
        return CategoryResource::collection($categories)->response();
    }

    /**
     * Store a new category.
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $category = Category::create($validated);
        return response()->json(['success' => 'Category created successfully', 'data' => new CategoryResource($category)], 201);
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)    
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified category.
     */
    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        $validated = $request->validated();
        $category->update($validated);
        return response()->json(['success' => 'Category updated successfully', 'data' => new CategoryResource($category)]);
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(['success' => 'Category deleted successfully']);
    }
}
