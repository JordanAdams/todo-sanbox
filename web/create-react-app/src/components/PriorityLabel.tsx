import { ChangeEvent } from "react";
import styled from "styled-components";
import config from "../config";
import { priorities, Priority } from "../services/todos";

type Color = Record<"bg" | "fg", string>

const colors: Record<Priority, Color> = {
  1: { bg: '#eee', fg: '#888' },
  2: { bg: config.theme.orange, fg: 'white' },
  3: { bg: config.theme.red, fg: 'white' }
}

const Wrapper = styled.div`
  position: relative;
`

const Label = styled.p<{ priority: Priority }>`
  background: ${props => colors[props.priority].bg};
  color: ${props => colors[props.priority].fg};
  padding: 0 .4em;
  font-weight: 500;
  margin: 0;
  font-size: 0.8em;
  border-radius: 5px;
`

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
`

interface PriorityIconProps {
  priority: Priority;
  disabled: boolean;
  onChange: (priority: Priority) => void;
}

export function PriorityLabel({ onChange, disabled, priority }: PriorityIconProps) {
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value) as Priority)
  }

  return (
    <Wrapper>
      <Label priority={priority}>{priorities[priority]}</Label>
      <Select disabled={disabled} defaultValue={priority} onChange={onSelectChange}>
        {Object.entries(priorities).map(([value, label]) =>
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        )}
      </Select>
    </Wrapper>
  )
}
