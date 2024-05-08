"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TimerDisplay from "@/components/TimerDisplay";
import PomodoroTimer from "@/components/PomodoroTimer";
import { Button } from "@/components/ui/button";

import { supabase } from "@/config/supabaseConfig";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  return (
    <div className="h-screen flex gap-4 m-2">
      {/* <TimerDisplay timers={timers} />
      <PomodoroTimer /> */}

      <Auth
        supabaseClient={supabase}
        providers={["github"]}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
      />
    </div>
  );
};

export default App;
