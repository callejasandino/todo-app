<?php

namespace App\Repositories;

use App\Interfaces\TodoInterface;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;

class TodoRepository implements TodoInterface
{
    public function index() : JsonResponse
    {
        $todos = Todo::paginate(10);

        return $this->apiResponse($todos, 'Todos retrieved successfully');
    }

    public function store(StoreTodoRequest $request) : JsonResponse
    {
        $todo = Todo::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 'pending'),
        ]);

        return $this->apiResponse($todo, 'Todo created successfully', 201);
    }

    public function update(UpdateTodoRequest $request) : JsonResponse
    {
        $todo = Todo::where('id', $request->input('id'))->first();

        if (!$todo) {
            return $this->apiResponse(null, 'Todo not found', 404);
        }

        $todo->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status', $todo->status),
        ]);

        return $this->apiResponse($todo, 'Todo updated successfully');
    }

    public function destroy($id) : JsonResponse
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->apiResponse(null, 'Todo not found', 404);
        }

        $todo->delete();

        return $this->apiResponse(null, 'Todo deleted successfully');
    }

    public function apiResponse($todo, $message = '', $status = 200) : JsonResponse
    {
        return response()->json([
            'todos' => $todo,
            'message' => $message,
        ], $status);
    }
}
