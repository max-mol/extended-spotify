import { Track } from "@/models/tracks/typing";
import { getCurrentlyPlayingTrack } from "@/services/PlayerService";
import { useEffect, useState } from "react";

const useCurrentlyPlayingTrackData = (): { item?: Track } => {
  const token = localStorage.getItem("access_token") as string;

  const [item, setItem] = useState<Track | undefined>(undefined);

  useEffect(() => {
    const handleGetTrack = async () => {
      const res = await getCurrentlyPlayingTrack({ token });

      setItem(res.data.item);
    };

    handleGetTrack();
  }, [token]);

  return { item };
};

export default useCurrentlyPlayingTrackData;
