import React, {
  useEffect,
  useState,
  PropsWithChildren,
  ComponentType
} from "react";

import EventEmitter from "@trayio/builder-squad-event-emitter";

interface ITrayObjectRaw {
  coords?: {
    x: number;
    y: number;
  };
  connector?: {
    iconURL: string;
    name: string;
  };
  trayTrollSays: string;
}

export interface ITrayObject {
  id: string;
  coords: {
    x: number;
    y: number;
  };
  connector: {
    iconURL: string;
    name: string;
  };
}

export interface ITrayContext {
  trayObjects: ITrayObject[];
  interestingTrayObjects: ITrayObject[];
  setInteresting: (id: string) => void;
}

const { Provider, Consumer } = React.createContext<ITrayContext>({
  trayObjects: [],
  interestingTrayObjects: [],
  setInteresting: () => null
});

const uniqueId = (): string => {
  return `id_${new Date().getTime()}`;
};

type IProps = PropsWithChildren<{ "data-tray": ITrayObjectRaw }>;

const EventEmitterInner: React.FC<IProps> = ({
  children,
  "data-tray": incomingData
}: IProps): React.ReactElement | null => {
  const [trayObjects, setTrayObjects] = useState<ITrayObject[]>([]);
  const [interestingTrayObjects, setInterestingTrayObjects] = useState<
    ITrayObject[]
  >([]);

  const normalize = (coord: number): number => {
    // Incoming data is actually in the range: -100 .. 1100
    return (coord + 100) * (1000 / 1200);
  };

  const setInteresting = (interestingId: string) => {
    const interestingObject = trayObjects.find(
      ({ id }) => id === interestingId
    );
    if (!interestingObject) {
      throw new Error("Unknown object");
    }
    setInterestingTrayObjects(prevInterestingTrayObjects => [
      ...prevInterestingTrayObjects,
      interestingObject
    ]);
    setTrayObjects(prevTrayObjects =>
      prevTrayObjects.filter(({ id }) => id !== interestingId)
    );
  };

  useEffect(() => {
    const { coords, connector } = incomingData;
    if (!coords || !connector) {
      // insufficient data
      return;
    }

    const { x, y } = coords;

    const id = uniqueId();

    setTrayObjects(prevTrayObjects => [
      ...prevTrayObjects,
      {
        coords: {
          x: normalize(x),
          y: normalize(y)
        },
        connector,
        id
      }
    ]);
  }, [incomingData]);
  return (
    <Provider value={{ trayObjects, interestingTrayObjects, setInteresting }}>
      {children}
    </Provider>
  );
};

export const TrayEventProvider: React.FC = ({
  children
}: PropsWithChildren<{}>): React.ReactElement => (
  <EventEmitter>
    {/* 
  // @ts-ignore */}
    <EventEmitterInner>{children}</EventEmitterInner>
  </EventEmitter>
);

export const withEventEmitter = <P extends PropsWithChildren<ITrayContext>>(
  ComponentToWrap: ComponentType<P>
) => {
  return class ClientComponent extends React.Component<
    Omit<P, "trayObjects" | "interestingTrayObjects" | "setInteresting">
  > {
    render() {
      return (
        <Consumer>
          {contextProps => {
            const props = {
              ...this.props,
              ...contextProps
            };
            // @ts-ignore
            return <ComponentToWrap {...props} />;
          }}
        </Consumer>
      );
    }
  };
};

export const TrayEventConsumer = Consumer;
