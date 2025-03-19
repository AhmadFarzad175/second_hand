<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ImageManipulation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    use ImageManipulation;
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage');
        $search = $request->input('search');
        $category = Category::query()->search($search);
        $category = $perPage ? $category->latest()->paginate($perPage) : $category->latest()->get();
        return CategoryResource::collection($category);
    }

    /**
     * Store a new category.
     */
    public function store(CategoryRequest $request)
    {
        $validated = $request->validated();
        $request->hasFile('image') ? $this->storeImage($request, $validated, "categories", 'image') : null;
        Category::create($validated);
        return response()->json(['success'=> 'Category created successfully']);
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
        $request->hasFile('image') && $this->updateImage($category, $request, $validated, 'categories', 'image');
        $category->update($validated);
        return response()->json(['success' => 'Category updated successfully']);
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        $this->deleteImage($category, 'categories', 'image');
        $category->delete();
        return response()->json(['success' => 'Category deleted successfully']);
    }
}
