import { RepeatStates } from "@/models/player/typing";
import { Track } from "@/models/tracks/typing";
import { getCurrentlyPlayingTrack } from "@/services/PlayerService";
import { useEffect, useState } from "react";

const useCurrentlyPlayingTrackData = (): {
  updateTrack: () => void;
  item?: Track;
} => {
  const token = localStorage.getItem("access_token") as string;

  const [item, setItem] = useState<Track | undefined>(undefined);

  const handleGetTrack = async () => {
    const res = await getCurrentlyPlayingTrack({ token });

    setItem(res.data.item);
  };

  useEffect(() => {
    handleGetTrack();
  }, [token]);

  return { item, updateTrack: handleGetTrack };
};

export default useCurrentlyPlayingTrackData;
