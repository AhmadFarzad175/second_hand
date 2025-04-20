<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReportMobileController extends Controller
{
    // POST /api/mobile/reports
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'reason' => 'required|string',
        ]);

        $report = Report::create($validated);
        return response()->json($report, 201);
    }
}
