import React from "react";

import styled from "styled-components";

import Timer from "./Timer";
import Main from "./Main";
import { TrayEventProvider } from "./TrayEventEmitter";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

function App() {
  return (
    <TrayEventProvider>
      <Header>
        <p>Matyas's visualizer</p>
        <p>
          <Timer />
        </p>
      </Header>
      <Main />
    </TrayEventProvider>
  );
}

export default App;
