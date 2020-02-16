import React from "react";

import { withEventEmitter, ITrayContext } from "./TrayEventEmitter";

interface ITrayOBject {
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

const Main: React.FC<ITrayContext> = (
  props: ITrayContext
): React.ReactElement => (
  <main>
    {/* TODO */}
    <div>Visualizer</div>
    <pre>{JSON.stringify(props, undefined, 2)}</pre>
    {/* TODO */}
    <div>Interesting connector</div>
  </main>
);

export default withEventEmitter(Main);
