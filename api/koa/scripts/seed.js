const Chance = require('chance');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const chance = new Chance();

const generateTodo = () => ({
  id: randomUUID(),
  title: chance.sentence({ words: chance.natural({ min: 2, max: 5 }) }),
  createdAt: chance.date().toISOString(),
  completedAt: chance.date().toISOString(),
  completed: chance.bool(),
  priority: chance.natural({ min: 1, max: 3 })
})

const todosCount = chance.natural({ min: 3, max: 10 });

const todos = new Array(todosCount).fill(null).map(generateTodo);

const outputFile = path.join(__dirname, '../data/todos.json');

fs.writeFileSync(outputFile, JSON.stringify(todos, null, 4))
