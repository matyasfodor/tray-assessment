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
}

const { Provider, Consumer } = React.createContext<ITrayContext>({
  trayObjects: []
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

  useEffect(() => {
    const { coords, connector } = incomingData;
    if (!coords || !connector) {
      // insufficient data
      return;
    }

    const id = uniqueId();

    setTrayObjects(prevTrayObjects => [
      ...prevTrayObjects,
      { coords, connector, id }
    ]);
  }, [incomingData]);
  return <Provider value={{ trayObjects }}>{children}</Provider>;
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
  return class ClientComponent extends React.Component<Omit<P, "trayObjects">> {
    render() {
      return (
        <Consumer>
          {({ trayObjects }) => {
            const props = { ...this.props, trayObjects };
            // @ts-ignore
            return <ComponentToWrap {...props} />;
          }}
        </Consumer>
      );
    }
  };
};

export const TrayEventConsumer = Consumer;
