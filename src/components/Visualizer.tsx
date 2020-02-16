import React from "react";
import { ITrayObject } from "./TrayEventEmitter";
import { Connector } from "./Connector";
import styled from "styled-components";

interface IProps {
  trayObjects: ITrayObject[];
}

const Container = styled.div`
  height: 1000px;
  width: 1000px;
  position: relative;
  background: lightgray;
`;

export const Visualizer: React.FC<IProps> = ({
  trayObjects
}: IProps): React.ReactElement => {
  return (
    <Container>
      {trayObjects.map(
        ({ coords, connector: { name, iconURL }, id }: ITrayObject) => (
          <Connector
            draggable
            coords={coords}
            name={name}
            iconURL={iconURL}
            key={id}
            id={id}
          />
        )
      )}
    </Container>
  );
};
