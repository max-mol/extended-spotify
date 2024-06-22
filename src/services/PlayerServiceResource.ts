import axios from "axios";

export interface PlayTrackVariables {
  contextUri: string;
  token: string;
  trackContextPosition: number;
}

export const PLAY_TRACK = async ({
  contextUri,
  token,
  trackContextPosition,
}: PlayTrackVariables) => {
  return axios({
    method: "put",
    url: "https://api.spotify.com/v1/me/player/play",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      context_uri: contextUri,
      offset: {
        position: trackContextPosition,
      },
      position_ms: 0,
    },
  });
};
