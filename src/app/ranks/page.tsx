"use client";

import Button from "@/components/ui/Button";
import { TimeRangeItem, TypeItem } from "@/models/user/typing";
import { getUserTops, getUserTopTracks } from "@/services/UserService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Ranks() {
  const token = localStorage.getItem("access_token") as string;

  const [level, setLevel] = useState<TypeItem>("artists");
  const [timeRange, setTimeRange] = useState<TimeRangeItem>("medium_term");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await getUserTops({ token, type: level, timeRange });
        console.log(res);
      } catch (e) {}
    };

    handleFetch();
  }, [level, timeRange]);

  return (
    <>
      <Box>
        Ranks
        <Button
          variant={level === "artists" ? "contained" : "outlined"}
          onClick={() => setLevel("artists")}
          buttonSx={{ ml: 1 }}
        >
          Artists
        </Button>
        <Button
          variant={level === "tracks" ? "contained" : "outlined"}
          onClick={() => setLevel("tracks")}
          buttonSx={{ ml: 1 }}
        >
          Tracks
        </Button>
      </Box>
      <Box mt={1}>
        <Button
          variant={timeRange === "short_term" ? "contained" : "outlined"}
          onClick={() => setTimeRange("short_term")}
          buttonProps={{ size: "small" }}
          buttonSx={{ textTransform: "none" }}
        >
          Last 4 weeks
        </Button>
        <Button
          variant={timeRange === "medium_term" ? "contained" : "outlined"}
          onClick={() => setTimeRange("medium_term")}
          buttonProps={{ size: "small" }}
          buttonSx={{ textTransform: "none" }}
        >
          Last 6 months
        </Button>
        <Button
          variant={timeRange === "long_term" ? "contained" : "outlined"}
          onClick={() => setTimeRange("long_term")}
          buttonProps={{ size: "small" }}
          buttonSx={{ textTransform: "none" }}
        >
          Last year
        </Button>
      </Box>
    </>
  );
}
