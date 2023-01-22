import { useEffect, useState } from "react";
import { getAllTodos, Todo, updateTodo, UpdateTodo } from "../services/todos";
import { PulseLoader } from 'react-spinners'
import styled from "styled-components";
import { TodoListItem } from "../components/TodoListItem";


const Wrapper = styled.div`
  background: white;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  `

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em 0;
  `

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  `

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState<string[]>([])


  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    getAllTodos({ signal: controller.signal })
      .then(setTodos)
      .finally(() => setLoading(false))

    return () => controller.abort();
  }, [])

  const addDisabled = (id: string) => setDisabled(d => [...d, id]);
  const removeDisabled = (id: string) => setDisabled(d => d.filter(i => i !== id))
  const isDisabled = (id: string) => disabled.includes(id);

  const onChange = (id: string) => (changes: UpdateTodo): void => {
    addDisabled(id);

    updateTodo(id, changes)
      .then(updated => setTodos(todos.map(t => t.id === id ? updated : t)))
      .finally(() => removeDisabled(id))
  }

  return (
    <Wrapper>
      {loading &&
        <LoadingWrapper>
          <PulseLoader color="#bbb" size={8} />
        </LoadingWrapper>
      }
      {todos.length > 0 &&
        <List>
          {todos && todos.map(todo =>
            <TodoListItem
              key={todo.id}
              todo={todo}
              disabled={isDisabled(todo.id)}
              onChange={onChange(todo.id)} />
          )}
        </List>
      }
    </Wrapper>
  );
}

