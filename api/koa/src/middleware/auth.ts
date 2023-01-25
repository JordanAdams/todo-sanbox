import { Middleware } from "koa";
import config from "../config";

export const authToken: Middleware = (ctx, next) => {
  if (!config.authToken) {
    return next();
  }

  console.log(config.authToken)
  console.log(ctx.headers);

  if (ctx.headers['x-api-token'] !== config.authToken) {
    ctx.status = 403;
    return;
  }

  return next();
}
