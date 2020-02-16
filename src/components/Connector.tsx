import React from "react";
import styled from "styled-components";

interface IProps {
  draggable?: boolean;
  coords?: {
    x: number;
    y: number;
  };
  name: string;
  iconURL: string;
  id: string;
}

const Container = styled.div<{ x?: number; y?: number; draggable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ draggable }) =>
    draggable &&
    `
    cursor: grab;
  `}
  ${({ x, y }) =>
    x &&
    y &&
    `
    position: absolute;
    top: ${x}px;
    left: ${y}px;
  `}
`;

export const Connector: React.FC<IProps> = ({
  draggable = false,
  coords,
  iconURL,
  name,
  id
}: IProps): React.ReactElement => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (draggable) {
      event.dataTransfer.setData("text", id);
    }
  };

  return (
    <Container
      {...(coords || {})}
      draggable={draggable}
      onDragStart={draggable ? onDragStart : () => null}
    >
      <img src={iconURL} width="64" height="64" draggable={false} alt={name} />
      <p draggable={false}>{name}</p>
    </Container>
  );
};
