<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'product_id',
        'reason',
        'date',

    ] ;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    // // Define scopes for commonly used queries
    // public function scopeRecent($query)
    // {
    //     return $query->orderBy('created_at', 'desc');
    // }

    // Define custom accessors or mutators if needed
    // public function getDateAttribute($value)
    // {
    //     // Perform any custom formatting if required
    //     return date('Y-m-d', strtotime($value));
    // }

    // public function setDateAttribute($value)
    // {
    //     // Perform any custom manipulation or validation of the date attribute
    //     $this->attributes['date'] = date('Y-m-d', strtotime($value));
    // }

    // Define additional methods as needed
    // public function isOverdue()
    // {
    //     // Example method to check if the report is overdue
    //     return strtotime($this->date) < strtotime('today');
    // }

}
