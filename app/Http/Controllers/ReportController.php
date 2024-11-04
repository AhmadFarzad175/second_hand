<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    /**
     * Display a paginated listing of reports.
     */
    public function index(): JsonResponse
    {
        $reports = Report::paginate(10); // Fetch and paginate reports
        return response()->json(ReportResource::collection($reports), 200);
    }

    /**
     * Store a newly created report in storage.
     */
    public function store(ReportRequest $request): JsonResponse
    {
        $report = Report::create($request->validated());
        return response()->json(['success' => 'Report created successfully', 'data' => new ReportResource($report)], 201);
    }

    /**
     * Display the specified report.
     */
    public function show(Report $report): JsonResponse
    {
        return response()->json(new ReportResource($report), 200);
    }

    /**
     * Update the specified report in storage.
     */
    public function update(ReportRequest $request, Report $report): JsonResponse
    {
        $report->update($request->validated());
        return response()->json(['success' => 'Report updated successfully', 'data' => new ReportResource($report)], 200);
    }

    /**
     * Remove the specified report from storage.
     */
    public function destroy(Report $report): JsonResponse
    {
        $report->delete();
        return response()->json(['success' => 'Report deleted successfully'], 200);
    }
}
