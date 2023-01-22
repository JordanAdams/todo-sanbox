# Base
FROM node:18-alpine as base


# Build
FROM base as build
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production \
  && cp -R node_modules prod_modules \
  && yarn install

COPY . .
RUN yarn build


# Final
FROM base
WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["yarn", "start"]
