"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TimerDisplay from "@/components/TimerDisplay";
import PomodoroTimer from "@/components/PomodoroTimer";

const socket = io("http://localhost:3000");

const App: React.FC = () => {
  const [timers, setTimers] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Request the current timers when the component mounts
    socket.emit("request timers");

    // Update state when a timer update is received
    socket.on("timer update", (data) => {
      setTimers(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("timer update");
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TimerDisplay timers={timers} />
      <PomodoroTimer />
    </div>
  );
};

export default App;
