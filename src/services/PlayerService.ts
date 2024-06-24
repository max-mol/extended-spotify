import {
  GET_CURRRENTLY_PLAYING_TRACK,
  GetCurrentlyPlayingTrackVariables,
  PAUSE_PLAYBACK,
  PLAY_TRACK,
  PausePlaybackVariables,
  PlayTrackVariables,
  RESUME_PLAYBACK,
  ResumePlaybackVariables,
  SET_PLAYBACK_VOLUME,
  SET_REPEAT_STATE,
  SKIP_TO_NEXT,
  SKIP_TO_PREVIOUS,
  SetPlaybackVolumeVariables,
  SetRepeatStateVariables,
  SkipToNextVariables,
  SkipToPreviousVariables,
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
export const skipToNext = ({ token }: SkipToNextVariables) =>
  SKIP_TO_NEXT({ token });
export const skipToPrevious = ({ token }: SkipToPreviousVariables) =>
  SKIP_TO_PREVIOUS({ token });
export const setPlaybackVolume = ({
  token,
  volume,
}: SetPlaybackVolumeVariables) => SET_PLAYBACK_VOLUME({ token, volume });

export const getCurrentlyPlayingTrack = ({
  token,
}: GetCurrentlyPlayingTrackVariables) =>
  GET_CURRRENTLY_PLAYING_TRACK({ token });

export const setRepeatState = ({
  token,
  repeatState,
}: SetRepeatStateVariables) => SET_REPEAT_STATE({ token, repeatState });
