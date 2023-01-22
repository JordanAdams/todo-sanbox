import styled, { createGlobalStyle } from 'styled-components';
import { TodoList } from './TodoList';

const Container = styled.div`
  margin: 3em auto;
  width: 50vw;
`

const Title = styled.h1`
  margin-bottom: .5em;
  font-size: 2em;
  color: #777;
  font-weight: 300;
`

const GlobalStyles = createGlobalStyle`
  html, body {
    background: #eee;
    font-size: 14pt;
    font-weight: 300;
  }
`;

export function App() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Title>Todo</Title>
        <TodoList />
      </Container>
    </>
  );
}

