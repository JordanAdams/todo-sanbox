import axios, { RawAxiosRequestConfig } from "axios";
import config from "../config";

export const priorities = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
} as const;

export type Priority = keyof typeof priorities;

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  completedAt: string | null;
  completed: boolean;
  priority: Priority;
}

interface SuccessResponse<T> { data: T };
interface ErrorResponse { error: string };
type Response<T> = SuccessResponse<T> | ErrorResponse;

type RequestOptions = Partial<Pick<RawAxiosRequestConfig, "signal">>;

const client = axios.create({ baseURL: config.api })

export const getAllTodos = async (options: RequestOptions): Promise<Todo[]> => {
  const { data } = await client.get<Response<Todo[]>>('/todos', options)
  if ('error' in data) {
    throw new Error(data.error);
  }

  return data.data;
}

export type UpdateTodo = Partial<Omit<Todo, "id">>;

export const updateTodo = async (id: string, changes: UpdateTodo): Promise<Todo> => {
  const { data } = await client.put<Response<Todo>>(`/todos/${id}`, changes);
  if ('error' in data) {
    throw new Error(data.error);
  }

  return data.data;
}
