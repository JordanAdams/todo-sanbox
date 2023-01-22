import { Context } from "koa";


export const checkOrigin = (ctx: Context) => {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',')

  const { origin } = ctx.headers;
  if (!origin) {
    return '';
  }

  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
    return origin
  } else {
    return '';
  }
}
