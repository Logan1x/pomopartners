import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

// TimerTabs Component
const TimerTabs: React.FC<{
  switchToWork: () => void;
  switchToBreak: () => void;
}> = ({ switchToBreak, switchToWork }) => {
  return (
    <div className="flex gap-4">
      <button
        className="border border-gray-300 rounded px-4 py-1"
        onClick={switchToWork}
      >
        Work
      </button>
      <button
        className="border border-gray-300 rounded px-4 py-1"
        onClick={switchToBreak}
      >
        Break
      </button>
    </div>
  );
};

// CountdownDisplay Component
const CountdownDisplay: React.FC<{ time: number }> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-4xl mb-4">
      {time > 0 ? (
        <div className="flex flex-col items-center mt-4">
          <p className="text-lg">Time remaining</p>
          <p className="text-8xl">
            {" "}
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds}
          </p>
        </div>
      ) : (
        <>
          <p className="text-8xl">
            {" "}
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds}
          </p>
        </>
        // "Timer stopped"
      )}
    </div>
  );
};

// StartPauseButton Component
const StartPauseButton: React.FC<{
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
}> = ({ isRunning, startTimer, pauseTimer }) => {
  return (
    <div className="flex text-4xl">
      {!isRunning ? (
        <button
          className="border border-gray-300 rounded py-1 px-4"
          onClick={startTimer}
        >
          Start
        </button>
      ) : (
        <button
          className="border border-gray-300 rounded py-1 px-4"
          onClick={pauseTimer}
        >
          Pause
        </button>
      )}
    </div>
  );
};

// Main PomodoroTimer Component
const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<"work" | "break">("work");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && isRunning) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    if (timer === 0) {
      const time = timerType === "work" ? 25 * 60 : 5 * 60;
      setTimer(time);
      socket.emit("start timer", {
        time: time,
        type: timerType,
      });
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    socket.emit("pause timer", {
      time: timer,
      type: timerType,
    });
  };

  const switchToWork = () => {
    setTimerType("work");
    setTimer(0);
    setIsRunning(false);
  };

  const switchToBreak = () => {
    setTimerType("break");
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <div
      className={`flex flex-col place-items-center justify-start gap-4 p-4 h-full pt-20`}
    >
      <TimerTabs switchToWork={switchToWork} switchToBreak={switchToBreak} />
      <h2
        className={`border-b-4 ${
          timerType === "break"
            ? "border-amber-500 hover:border-amber-400"
            : "border-blue-500 hover:border-blue-400"
        }`}
      >
        {timerType.slice(0, 1).toUpperCase()}
        {timerType.slice(1)}
      </h2>
      <CountdownDisplay time={timer} />
      <StartPauseButton
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
    </div>
  );
};

export default PomodoroTimer;
