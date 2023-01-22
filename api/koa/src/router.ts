import Router, { IRouterParamContext as RouterContext } from 'koa-router';
import { DefaultState, ParameterizedContext } from 'koa';
import { createTodo, getAllTodos, getTodo, Todo, CreateTodo, UpdateTodo, updateTodo, deleteTodo } from './todos';

const router = new Router();

interface SuccessResponse<T> { data: T };

interface ErrorResponse { error: string };

type Response<T> = SuccessResponse<T> | ErrorResponse;

type Context<T> = ParameterizedContext<DefaultState, RouterContext, Response<T>>

const notFound = (ctx: Context<any>): void => {
  ctx.status = 404;
  ctx.body = { error: 'Not Found' };
}

const badRequest = (ctx: Context<any>): void => {
  ctx.status = 400;
  ctx.body = { error: 'Bad Request' };
}

router.get('/todos', async (ctx: Context<Todo[]>) => {
  ctx.body = { data: await getAllTodos() };
})

type GetTodoContext = Context<Todo>;

router.get('/todos/:id', async (ctx: GetTodoContext) => {
  const todo = await getTodo(ctx.params.id)
  if (!todo) {
    return notFound(ctx);
  }

  ctx.body = { data: todo }
})

router.post('/todos', async (ctx: Context<Todo>) => {
  const body = ctx.request.body as CreateTodo | undefined;
  if (!body) {
    return badRequest(ctx);
  }

  const todo = await createTodo(body)
  ctx.body = { data: todo }
})

type UpdateTodoContext = Context<Todo>

router.put('/todos/:id', async (ctx: UpdateTodoContext) => {
  const body = ctx.request.body as UpdateTodo | undefined;
  if (!body) {
    return badRequest(ctx);
  }

  const todo = await updateTodo(ctx.params.id, body)
  if (!todo) {
    return notFound(ctx);
  }

  ctx.body = { data: todo }
})

router.delete('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const todo = getTodo(id);
  if (!todo) {
    return notFound(ctx);
  }

  await deleteTodo(id);
  ctx.status = 200
})

export default router;
