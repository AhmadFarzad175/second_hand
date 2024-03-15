<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reports = Report::paginate(10);
        return ReportResource::collection($reports);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportRequest $request)
    {
        $report = Report::create($request->validated());
        // return new ReportResource($report);
        return response()->json(['success' => 'report insert successfully']);
    }








    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return new ReportResource($report);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(ReportRequest $request, Report $report)
    {
        $report->update($request->validated());
        // return new ReportResource($report);
        // $report->fill($request->validated())->save();
        // return new ReportResource($report);
        return response()->json(['success'=> 'report updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
        return response()->json(["message" => "Report deleted successfully"]);
    }
}
