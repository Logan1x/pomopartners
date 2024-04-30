"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TimerDisplay from "@/components/TimerDisplay";
import PomodoroTimer from "@/components/PomodoroTimer";
import { Button } from "@/components/ui/button";

import { supabase } from "@/config/supabaseConfig";

const App: React.FC = () => {
  const [timers, setTimers] = useState<{ [key: string]: any }>({});
  const [uData, setUData] = useState<any>(null);

  // useEffect(() => {
  //   // // Request the current timers when the component mounts
  //   // socket.emit("request timers");
  //   // // Update state when a timer update is received
  //   // socket.on("timer update", (data) => {
  //   //   setTimers(data);
  //   // });
  //   // // Clean up the event listener when the component unmounts
  //   // return () => {
  //   //   socket.off("timer update");
  //   // };
  //   // async function fetchData() {
  //   //   try {
  //   //     const { data, error } = await supabase.from("user").select();
  //   //     console.log("error", error);
  //   //   } catch (error) {
  //   //     console.error("error", error);
  //   //   }
  //   // }
  //   // fetchData();
  // }, []);

  const handleAnonymousLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      console.log("error", error);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      console.log("data", data);
      console.log("error", error);
    } catch (error) {
      console.error("error", error);
    }
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setUData(null);
  }

  return (
    <div className="h-screen flex gap-4 m-2">
      {/* <TimerDisplay timers={timers} />
      <PomodoroTimer /> */}

      <Button variant={"default"} size={"sm"} onClick={handleAnonymousLogin}>
        Login Anonymously
      </Button>
      <Button variant={"default"} size={"sm"} onClick={handleGithubLogin}>
        Login with Github
      </Button>
      <Button variant={"default"} size={"sm"} onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default App;
