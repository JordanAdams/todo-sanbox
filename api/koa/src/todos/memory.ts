import type { CreateTodo, DeleteTodo, GetTodo, Todo, UpdateTodo, UpdateTodoData } from '.';
import { randomUUID } from 'crypto';
import fs from 'fs-extra';
import path from 'path';

const filePath = path.join(__dirname, '../../data/todos.json');

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, '[]');
}

export const getAllTodos = async (): Promise<Todo[]> => {
  const data = await fs.readFile(filePath)
  return JSON.parse(data.toString()) as Todo[];
}

const setAllTodos = async (todos: Todo[]): Promise<void> => {
  const json = JSON.stringify(todos);
  await fs.writeFile(filePath, json)
}

export const getTodo: GetTodo = async (id) => {
  const todos = await getAllTodos();
  return todos.find(t => t.id == id) || null;
}


export const createTodo: CreateTodo = async (data) => {
  const todo: Todo = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    completed: false,
    completedAt: null,
    priority: 1,
    ...data,
  };

  await setAllTodos([...(await getAllTodos()), todo]);

  return todo;
}

export const updateTodo: UpdateTodo = async (id: string, data: UpdateTodoData): Promise<Todo | null> => {
  const todo = await getTodo(id);
  if (!todo) {
    return null;
  }

  const updated: Todo = { ...todo, ...data }
  if (todo.completed !== updated.completed) {
    updated.createdAt = new Date().toISOString();
  }

  const todos = await getAllTodos();

  await setAllTodos(todos.map(t => t.id === id ? updated : t))

  return updated;
}

export const deleteTodo: DeleteTodo = async (id: string): Promise<void> => {
  const todos = await getAllTodos();
  await setAllTodos(todos.filter(t => t.id !== id))
}
