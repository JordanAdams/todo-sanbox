import styled from 'styled-components';
import { Priority, Todo, UpdateTodo } from '../services/todos';
import { BsCheck2Circle, BsCircle } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import config from '../config';
import { PriorityLabel } from './PriorityLabel';
import { ChangeEvent, KeyboardEvent, useRef } from 'react';

const IconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

interface CompletedIconProps {
  onClick: () => void;
  completed: boolean;
};

function CompletedIcon({ completed, onClick }: CompletedIconProps) {
  const color = completed ? config.theme.green : "#aaa";

  return (
    <IconContext.Provider value={{ color, size: "1.3em" }}>
      <IconWrapper onClick={onClick}>
        {completed ? <BsCheck2Circle /> : <BsCircle />}
      </IconWrapper>
    </IconContext.Provider>
  );
}

const Wrapper = styled.li<{ disabled: boolean }>`
  padding: 1em .5em;
  border-bottom: 1px dotted #ccc;
  display: flex;
  align-items: center;
  gap: .75em;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: opacity 0.2s ease-in-out;
  line-height: 1;

  &:last-child {
    border: none;
  }
`

const Title = styled.div`
  flex-grow: 1;

  input {
    background: transparent;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    max-width: none;
  }
`

interface TodoListItemProps {
  todo: Todo
  disabled: boolean
  onChange: (changes: UpdateTodo) => void
}

export function TodoListItem({ onChange, todo, disabled }: TodoListItemProps) {
  const title = useRef<HTMLInputElement | null>(null);

  const onTitleChange = (): void => {
    if (title.current && title.current.value !== todo.title) {
      onChange({ title: title.current.value })
    }
  }

  const onCompletedToggle = (): void => onChange({ completed: !todo.completed })

  const onPriorityChange = (priority: Priority): void => onChange({ priority })

  const onTitleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      title.current?.blur()
    }
  }

  return (
    <Wrapper disabled={disabled}>
      <CompletedIcon onClick={onCompletedToggle} completed={todo.completed} />
      <Title>
        <input defaultValue={todo.title} ref={title} onBlur={onTitleChange} onKeyUp={onTitleKeyUp} />
      </Title>
      <PriorityLabel disabled={disabled} onChange={onPriorityChange} priority={todo.priority} />
    </Wrapper >
  );
}
