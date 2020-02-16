import React from "react";
import styled from "styled-components";
import { ITrayObject } from "./TrayEventEmitter";
import { Connector } from "./Connector";

const Container = styled.div`
  width: 1000px;
  min-height: 100px;
  display: flex;
  background: lightgray;
  margin-top: 20px;
  flex-wrap: wrap;
`;

interface IProps {
  trayObjects: ITrayObject[];
  onDrop: (id: string) => void;
}

const InterestingVisualizer: React.FC<IProps> = (
  props: IProps
): React.ReactElement => {
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    if (!id) {
      return;
    }
    props.onDrop(id);
  };
  return (
    <Container onDragOver={onDragOver} onDrop={onDrop}>
      {props.trayObjects.map(
        ({ connector: { name, iconURL }, id }: ITrayObject) => (
          <Connector name={name} iconURL={iconURL} key={id} id={id} />
        )
      )}
    </Container>
  );
};

export default InterestingVisualizer;
