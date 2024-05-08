"use client";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

type Props = {};

export default function Dashboard({}: Props) {
  const [user, setUser] = useState({});

  const router = useRouter();
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((user) => {
        if (user) {
          console.log(user);
          setUser(user.data);
        }
      });
    }
    getUserData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <div className="px-12"> {JSON.stringify(user)}</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
}
