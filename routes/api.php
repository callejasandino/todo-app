<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::prefix('todo')->group(function () {
    Route::get('/', [TodoController::class, 'index']);
    Route::post('/', [TodoController::class, 'store']);
    Route::put('/', [TodoController::class, 'update']);
    Route::delete('/{id}', [TodoController::class, 'destroy']);
});