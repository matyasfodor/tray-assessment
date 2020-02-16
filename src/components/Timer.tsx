import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

// The formatstring "HH:MM:ss.S" was not working, that's why I slice
// Might submit an issue for dayjs
const getCurrentTimeString = () =>
  dayjs()
    .format("HH:MM:ss.SSS")
    .substring(0, 10);

const Timer: React.FC = (): React.ReactElement => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(getCurrentTimeString());
    }, 100);
    return () => clearInterval(id);
  });

  return <>{currentTime}</>;
};

export default Timer;
