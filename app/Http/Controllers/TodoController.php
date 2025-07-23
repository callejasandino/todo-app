<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Repositories\TodoRepository;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    protected $todoRepository;

    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    public function index(): JsonResponse
    {
        return $this->todoRepository->index();
    }

    public function store(StoreTodoRequest $request): JsonResponse
    {
        return $this->todoRepository->store($request);
    }

    public function update(UpdateTodoRequest $request): JsonResponse
    {
        return $this->todoRepository->update($request);
    }

    public function destroy($id): JsonResponse
    {
        return $this->todoRepository->destroy($id);
    }
}
