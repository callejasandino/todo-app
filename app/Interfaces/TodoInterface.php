<?php

namespace App\Interfaces;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\JsonResponse;

interface TodoInterface
{
    public function index() : JsonResponse;

    public function store(StoreTodoRequest $request) : JsonResponse;

    public function update(UpdateTodoRequest $request) : JsonResponse;

    public function destroy($id) : JsonResponse;

    public function apiResponse($data, $message = '', $status = 200) : JsonResponse;
}
