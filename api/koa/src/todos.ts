import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  completedAt: string | null;
  completed: boolean;
  priority: 1 | 2 | 3;
}

const filePath = path.join(__dirname, '../data/todos.json');

export const getAllTodos = async (): Promise<Todo[]> => {
  const data = await fs.readFile(filePath)
  return JSON.parse(data.toString()) as Todo[];
}

const setAllTodos = async (todos: Todo[]): Promise<void> => {
  const json = JSON.stringify(todos);
  await fs.writeFile(filePath, json)
}

export const getTodo = async (id: string): Promise<Todo | null> => {
  const todos = await getAllTodos();
  return todos.find(t => t.id == id) || null;
}

export type CreateTodo = Pick<Todo, "title"> & Partial<Pick<Todo, "priority">>

export const createTodo = async (data: CreateTodo): Promise<Todo> => {
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

export type UpdateTodo = Partial<Omit<Todo, "id">>;

export const updateTodo = async (id: string, data: UpdateTodo): Promise<Todo | null> => {
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

export const deleteTodo = async (id: string): Promise<void> => {
  const todos = await getAllTodos();
  await setAllTodos(todos.filter(t => t.id !== id))
}
