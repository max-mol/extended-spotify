"use client";

import Button from "@/components/ui/Button";

const getAuthorizationParams = async () => {
  const generateRandomString = (length: number) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem("code_verifier", codeVerifier);

  const queryParams: string = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    scope: "user-read-private user-read-email user-library-read",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
  }).toString();

  return {
    authUrl: authUrl,
    queryParams: queryParams,
  };
};

export default function Home() {
  const handleAuthorization = async () => {
    const { authUrl, queryParams } = await getAuthorizationParams();

    authUrl.search = queryParams;
    window.location.href = authUrl.toString();
  };

  return (
    <main>
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleAuthorization}>
          Sign in to Spotify
        </Button>
      </div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Welcome</h1>
      </div>
    </main>
  );
}
