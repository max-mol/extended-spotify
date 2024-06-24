"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MuiProvider from "@/components/ui/MuiProvider";
import { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { Tabs, TabProps as MuiTabProps, Tab, Box, Grid } from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import { usePathname } from "next/navigation";
import MusicPlayerSlider from "@/components/ui/MusicPlayerSlider";
import useCurrentlyPlayingTrackData from "./useCurrentlyPlayingTrackData";

const inter = Inter({ subsets: ["latin"] });

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
    scope:
      "user-read-private user-read-email user-library-read app-remote-control streaming user-read-playback-state user-modify-playback-state",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
  }).toString();

  return {
    authUrl: authUrl,
    queryParams: queryParams,
  };
};

const tabs = [
  {
    path: "/",
    tab: "undefined",
    icon: <AlbumIcon fontSize="large" />,
  },
  {
    path: "/profile",
    tab: "profile",
    label: "Profile",
  },
  {
    path: "/collection",
    tab: "collection",
    label: "Collection",
  },
  {
    path: "/ranks",
    tab: "ranks",
    label: "Ranks",
  },
];

interface TopMenuTabProps extends MuiTabProps {
  path: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const tabValue = tabs.find((tab) => tab.path === pathname)?.tab;

  const handleAuthorization = async () => {
    const { authUrl, queryParams } = await getAuthorizationParams();

    authUrl.search = queryParams;
    window.location.href = authUrl.toString();
  };

  const TopMenuTab = ({ path, ...rest }: TopMenuTabProps) => {
    return (
      <Link href={path} color="white" underline="none">
        <Tab
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "18px",
          }}
          {...rest}
        />
      </Link>
    );
  };

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: "25px" }}>
        <MuiProvider>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={handleAuthorization}>
              Sign in to Spotify
            </Button>
          </div>
          <Grid container>
            <Grid item xs={4}>
              <Tabs value={tabValue} sx={{ mb: 2 }}>
                {tabs.map(({ path, label, tab, icon }) => (
                  <TopMenuTab
                    key={tab}
                    path={path}
                    value={tab}
                    label={label}
                    icon={icon}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={4}>
              <MusicPlayerSlider />
            </Grid>
            <Grid item xs={4} />
          </Grid>
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}
