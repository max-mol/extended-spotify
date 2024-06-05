"use client";

import { getTokenQuery } from "@/services/TokenService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  const handleGetToken = async (code: string) => {
    const buf = window.btoa(``);

    console.log(code);
    console.log(buf);

    const res = await getTokenQuery(buf, code);

    if (res?.data) {
      localStorage.setItem(
        "spotifyToken",
        JSON.stringify({
          value: res.data.access_token,
          expiry: new Date().getTime() + res.data.expires_in * 1000,
        })
      );
      router.replace("/");
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const code = url.get("code");

    if (code) handleGetToken(code);
  }, []);

  return <div>Redirecting</div>;
}
