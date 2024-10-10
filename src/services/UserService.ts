"use client";

import {
  GET_CURRENT_USER_PROFILE,
  GET_USER_TOP_ARTISTS,
  GET_USER_TOP_TRACKS,
  GET_USER_TOPS,
  GetUserTopsVariables,
  GetUserTopVariables,
} from "./UserServiceResource";

export const getCurrentUserProfile = async (token: string) =>
  GET_CURRENT_USER_PROFILE(token);

export const getUserTopTracks = async ({
  token,
  timeRange,
}: GetUserTopVariables) => GET_USER_TOP_TRACKS({ token, timeRange });

export const getUserTopArtists = async ({
  token,
  timeRange,
}: GetUserTopVariables) => GET_USER_TOP_ARTISTS({ token, timeRange });

export const getUserTops = async ({
  token,
  type,
  timeRange,
}: GetUserTopsVariables) => GET_USER_TOPS({ token, type, timeRange });
