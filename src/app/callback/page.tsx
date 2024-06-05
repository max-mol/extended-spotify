"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getToken = async (code: string) => {
  let codeVerifier = localStorage.getItem("code_verifier") as string;

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch("https://accounts.spotify.com/api/token", payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
};

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code") as string;

    if (code) {
      router.replace("/");
      getToken(code);
    }
  });
}
