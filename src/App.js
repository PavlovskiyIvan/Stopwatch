import React, { useState } from "react";
import "./index";

export default function App() {
  let [hour, setHour] = useState(null);
  let [minute, setMinute] = useState(null);
  let [second, setSecond] = useState(null);

  let [stopHour, setStopHour] = useState(null);
  let [stopMinute, setStopMinute] = useState(null);
  let [stopSecond, setStopSecond] = useState(null);

  let [clickedCounting, setClickedCounting] = useState(false);

  let [timer, setTimer] = useState(null);

  let [clickedPause, setClickedPause] = useState(false);

  let [firstClick, setFirstClick] = useState(null);
  let [secondClick, setSecondClick] = useState(null);

  let counting = () => {
    clickedCounting === false
      ? setClickedCounting(true)
      : setClickedCounting(false);
    if (clickedCounting === null) {
      setHour(null);
      setMinute(null);
      setSecond(null);
      setClickedCounting(false);
    }

    if (clickedCounting === false) {
      if (
        typeof stopHour === "number" ||
        typeof stopMinute === "number" ||
        typeof stopSecond === "number"
      ) {
        hour = stopHour;
        minute = stopMinute;
        second = stopSecond;
      }
      setTimer(
        setInterval(() => {
          if (second === 59) {
            if (minute < 9) {
              minute === "null" ? setStopMinute(null) : setStopMinute(minute);

              second = null;
              setSecond(null);
              setMinute("0" + (minute += 1));
            } else {
              minute === "null" ? setStopMinute(null) : setStopMinute(minute);
              second = null;
              setSecond(null);
              setMinute((minute += 1));
            }

            if (minute === 59) {
              if (hour < 9) {
                hour === "null" ? setStopHour(null) : setStopHour(hour);

                minute = null;
                setMinute(null);
                setHour("0" + (hour += 1));
              } else {
                hour === "null" ? setStopHour(null) : setStopHour(hour);
                minute = null;
                setMinute(null);
                setHour((hour += 1));
              }
            }
          } else {
            if (second < 9) {
              second === "null" ? setStopSecond(null) : setStopSecond(second);

              setSecond("0" + (second += 1));
            } else {
              setSecond((second += 1));
            }
          }
        }, 1000)
      );
    } else if (clickedCounting === true) {
      setTimer(clearInterval(timer));
      setClickedCounting(null);

      setStopHour(null);
      setStopMinute(null);
      setStopSecond(null);
    }
  };

  let pause = () => {
    clickedPause === false ? setClickedPause(true) : setClickedPause(false);

    if (clickedPause === false) {
      setFirstClick((firstClick = new Date()));
    } else if (clickedPause === true) {
      setSecondClick((secondClick = new Date()));
      if (secondClick.getTime() - firstClick.getTime() < 300) {
        setTimer(clearInterval(timer));
        setClickedCounting(false);
      }
    }
  };

  let reset = () => {
    setTimer(clearInterval(timer));
    setHour(null);
    setMinute(null);
    setSecond(null);

    setStopHour(null);
    setStopMinute(null);
    setStopSecond(null);

    hour = null;
    minute = null;
    second = null;

    setTimer(
      setInterval(() => {
        if (second === 59) {
          if (minute < 9) {
            second = null;
            setSecond(null);
            setMinute("0" + (minute += 1));
          } else {
            second = null;
            setSecond(null);
            setMinute((minute += 1));
          }

          if (minute === 59) {
            if (hour < 9) {
              minute = null;
              setMinute(null);
              setHour("0" + (hour += 1));
            } else {
              minute = null;
              setMinute(null);
              setHour((hour += 1));
            }
          }
        } else {
          if (second < 9) {
            setSecond("0" + (second += 1));
          } else {
            setSecond((second += 1));
          }
        }
      }, 1000)
    );
  };
  return (
    <div>
      <h1>
        {hour === null ? "00" : hour}:{minute === null ? "00" : minute}:
        {second === null ? "00" : second}
      </h1>
      <div>
        <button onClick={counting}>Start/Stop</button>
        <button onClick={pause}>Wait</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
