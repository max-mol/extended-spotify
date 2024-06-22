import { Actions, Context, Device } from "@/models/player/typing";
import { Track } from "@/models/tracks/typing";
import axios, { AxiosResponse } from "axios";

//@todo globalize token in variables

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

export interface PausePlaybackVariables {
  token: string;
}

export const PAUSE_PLAYBACK = async ({ token }: PausePlaybackVariables) => {
  return axios({
    method: "put",
    url: "https://api.spotify.com/v1/me/player/pause",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export interface ResumePlaybackVariables {
  token: string;
}

export const RESUME_PLAYBACK = async ({ token }: ResumePlaybackVariables) => {
  return axios({
    method: "put",
    url: "https://api.spotify.com/v1/me/player/play",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export interface SkipToNextVariables {
  token: string;
}

export const SKIP_TO_NEXT = async ({ token }: SkipToNextVariables) => {
  return axios({
    method: "post",
    url: "https://api.spotify.com/v1/me/player/next",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export interface SkipToPreviousVariables {
  token: string;
}

export const SKIP_TO_PREVIOUS = async ({ token }: SkipToPreviousVariables) => {
  return axios({
    method: "post",
    url: "https://api.spotify.com/v1/me/player/previous",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export interface SetPlaybackVolumeVariables {
  token: string;
  volume: number;
}

export const SET_PLAYBACK_VOLUME = async ({
  token,
  volume,
}: SetPlaybackVolumeVariables) => {
  return axios({
    method: "put",
    url: "https://api.spotify.com/v1/me/player/volume",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      volume_percent: volume,
    },
  });
};

export interface GetCurrentlyPlayingTrackVariables {
  token: string;
}

export interface GetCurrentlyPlayingTrackResult {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: string;
  actions: Actions;
}

export const GET_CURRRENTLY_PLAYING_TRACK = async ({
  token,
}: GetCurrentlyPlayingTrackVariables): Promise<
  AxiosResponse<GetCurrentlyPlayingTrackResult, any>
> => {
  return axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
