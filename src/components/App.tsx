import React from "react";
import styled from "styled-components";

import Timer from "./Timer";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

function App() {
  return (
    <div>
      <Header>
        <p>Matyas's visualizer</p>
        <p>
          <Timer />
        </p>
      </Header>
      <main></main>
    </div>
  );
}

export default App;
