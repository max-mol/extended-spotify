"use client";

import Button from "@/components/ui/button";
import generateRandomString from "@/utils/generateRandomString";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAuthorization = async () => {
    const queryParams: string = new URLSearchParams({
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      scope: "user-read-private user-read-email",
      state: generateRandomString(16),
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
    }).toString();

    const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams}`;

    router.replace(authorizationUrl);
  };

  return (
    <main style={{ margin: "25px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleAuthorization}>
          Sign in to Spotify
        </Button>
      </div>
      <div style={{ justifyContent: "center" }}>
        <h1>Welcome</h1>
      </div>
    </main>
  );
}
