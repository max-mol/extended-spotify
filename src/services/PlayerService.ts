import {
  GET_CURRRENTLY_PLAYING_TRACK,
  GetCurrentlyPlayingTrackVariables,
  PAUSE_PLAYBACK,
  PLAY_TRACK,
  PausePlaybackVariables,
  PlayTrackVariables,
  RESUME_PLAYBACK,
  ResumePlaybackVariables,
} from "./PlayerServiceResource";

export const playTrack = ({
  contextUri,
  token,
  trackContextPosition,
}: PlayTrackVariables) =>
  PLAY_TRACK({ contextUri, token, trackContextPosition });

export const resumePlayback = ({ token }: ResumePlaybackVariables) =>
  RESUME_PLAYBACK({ token });
export const pausePlayback = ({ token }: PausePlaybackVariables) =>
  PAUSE_PLAYBACK({ token });

export const getCurrentlyPlayingTrack = ({
  token,
}: GetCurrentlyPlayingTrackVariables) =>
  GET_CURRRENTLY_PLAYING_TRACK({ token });
