import config from '../config';
import * as memory from './memory';

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  completedAt: string | null;
  completed: boolean;
  priority: number;
}

export interface TodoStore {
  getAllTodos: GetAllTodos;
  getTodo: GetTodo;
  createTodo: CreateTodo;
  updateTodo: UpdateTodo;
  deleteTodo: DeleteTodo;
}
export type GetAllTodos = () => Promise<Todo[]>;

export type GetTodo = (id: string) => Promise<Todo | null>;

export type CreateTodoData = Pick<Todo, "title"> & Partial<Pick<Todo, "priority">>

export type CreateTodo = (data: CreateTodoData) => Promise<Todo>

export type UpdateTodoData = Partial<Omit<Todo, "id">>;

export type UpdateTodo = (id: string, data: UpdateTodoData) => Promise<Todo | null>

export type DeleteTodo = (id: string) => Promise<void>;

const stores: Record<string, TodoStore> = {
  MEMORY: memory
};

const store = stores[config.storeEngine] || stores.MEMORY;

export const getAllTodos = store.getAllTodos;
export const getTodo = store.getTodo;
export const createTodo = store.createTodo;
export const updateTodo = store.updateTodo;
export const deleteTodo = store.deleteTodo;
