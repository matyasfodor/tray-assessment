import React from "react";

import { withEventEmitter, ITrayContext } from "./TrayEventEmitter";
import { Visualizer } from "./Visualizer";
import InterestingVisualizer from "./InterestingVisualizer";

const Main: React.FC<ITrayContext> = ({
  trayObjects,
  interestingTrayObjects,
  setInteresting
}: ITrayContext): React.ReactElement => (
  <div>
    <Visualizer trayObjects={trayObjects} />
    <InterestingVisualizer
      onDrop={setInteresting}
      trayObjects={interestingTrayObjects}
    />
  </div>
);

export default withEventEmitter(Main);
