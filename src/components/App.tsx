import React from "react";

import styled from "styled-components";

import Timer from "./Timer";
import Main from "./Main";
import { TrayEventProvider } from "./TrayEventEmitter";

const Container = styled.div`
  margin: auto;
  width: 1000px;
`;

const Header = styled.header`
  width: 1000px;
  display: flex;
  justify-content: space-between;
`;

function App() {
  return (
    <Container>
      <TrayEventProvider>
        <Header>
          <p>Matyas's visualizer</p>
          <p>
            <Timer />
          </p>
        </Header>
        <Main />
      </TrayEventProvider>
    </Container>
  );
}

export default App;
