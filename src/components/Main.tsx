import React from "react";

import { withEventEmitter, ITrayContext } from "./TrayEventEmitter";
import { Visualizer } from "./Visualizer";
import InterestingVisualizer from "./InterestingVisualizer";

const Main: React.FC<ITrayContext> = ({
  trayObjects
}: ITrayContext): React.ReactElement => (
  <main>
    {/* TODO */}
    {/* <div>Visualizer</div> */}
    <Visualizer trayObjects={trayObjects} />
    {/* TODO */}
    <InterestingVisualizer />
  </main>
);

export default withEventEmitter(Main);
