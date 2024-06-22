import { PLAY_TRACK, PlayTrackVariables } from "./PlayerServiceResource";

export const playTrack = ({
  contextUri,
  token,
  trackContextPosition,
}: PlayTrackVariables) =>
  PLAY_TRACK({ contextUri, token, trackContextPosition });
