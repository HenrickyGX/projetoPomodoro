import {   Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
 

  const buttons = [
    {
      value: 60,
      display: "1 minutes"
    },
    {
      value: 900,
      display: "15 minutes",
    },
    {
      value: 1800,
      display: "30 minutes",
    },
    {
      value: 3600,
      display: "60 minutes",
    },
    {
      value: 0,
      display: "Restart",

    }
  ];
  const toggleTimer = () => {
    setTimerStart(!timerStart);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStart, time]);
  return (
    <div className="App" style={{ height: "100%" }}>
      <Flex
        background="gray.700"
        height="100%"
        alignItems="center"
        flexDirection="column"
      >
        <h1>
         Tempo Pomodoro
        </h1>
        <Text fontWeight="bold" fontSize="7xl" color="white">
          {`${Math.floor(time / 60) < 10
              ? `0${Math.floor(time / 60)}`
              : `${Math.floor(time / 60)}`
            }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
        </Text>
        <Flex>
          <button onClick={toggleTimer}>
            {!timerStart ? "Start" : "Pause"}
          </button>


        </Flex>
        <Flex marginTop={10}>
          {buttons.map(({ value, display }) => (
            <button
              color="white"
              onClick={() => {
                setTimerStart(false);
                setTime(value);
              }}
            >
              {display}
            </button>
          ))}
        </Flex>
      </Flex>
    </div>
  );
}
export default App;