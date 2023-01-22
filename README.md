<p align="center" margin="0"></p>
<h3 align="center">Todo Sandbox</h3>
<p align="center"><sup>A smol sandbox app for learning new things</sup></p>
<hr />

### What's This?

When I'm faced with a new technology to learn it's often tricky finding a real-world<sup>-ish</sup> app to practice on. 
This repo and the implementations within it provide a space to quickly implement new libraries, tech, languages etc.

Inspired by [TodoMVC](https://todomvc.com/) and [RealWorld](https://github.com/gothinkster/realworld).

### Implementations

#### API

- [/] [Koa](https://github.com/JordanAdams/todo-sandbox/tree/master/api/koa) (REST)
- [ ] GraphQL
- [ ] Rust
- [ ] Go
- [ ] Clojure
- [ ] gRPC
- [ ] tRPC
- [ ] Cloud Functions + API Gateway

#### Frontend
- [/] [Create React App](https://github.com/JordanAdams/todo-sandbox/tree/master/web/create-react-app)
- [ ] Svelte
- [ ] Remix
- [ ] Vite


#### Data

- [ ] Redis
- [ ] MongoDB
- [ ] Postgres
- [ ] Google Datastore
- [ ] Kafka

#### Infra

- [ ] Google Cloud Run
- [ ] K8s
- [ ] Terraform

---

### Functionality

#### API/Backend

- Get all todos
- Get individual todo
- Create a todo
- Update a todo
- Delete a todo

#### Frontend

- List all todos
- Complete / Uncomplete<sup>([?](https://www.merriam-webster.com/dictionary/uncomplete))</sup> todos
- Update todo title
- Update todo label
- Delete a todo

### Data Definition

#### Todo

Property    | Type    | Required | Notes
----------- | ------- | -------- | -----
id          | uuid    | Y        | 
title       | string  | Y        |
createdAt   | date    | Y        | [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
completedAt | string  |          | [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
completed   | boolean | Y        |
priority    | number  |          | 1 = Low <br /> 2 = Medium <br /> 3 = High



