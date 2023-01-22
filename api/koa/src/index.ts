if (process.env.NODE_ENV?.toLowerCase() !== "production") {
  require('dotenv/config');
}

import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logging from 'koa-logger'
import router from './router';
import { checkOrigin } from './check-origin';

const app = new Koa();

app.use(logging())
app.use(bodyParser())

app.use(cors({ origin: checkOrigin }))

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on :${port}`))
