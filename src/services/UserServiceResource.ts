import { Artists } from "@/models/artists/typing";
import { Tracks } from "@/models/tracks/typing";
import { TimeRangeItem, TypeItem, User } from "@/models/user/typing";
import axios, { AxiosResponse } from "axios";

export const GET_CURRENT_USER_PROFILE = async (
  token: string
): Promise<AxiosResponse<User, any>> =>
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export interface GetUserTopVariables {
  token: string;
  timeRange?: TimeRangeItem;
  limit?: number;
  offset?: number;
}

export const GET_USER_TOP_TRACKS = async ({
  token,
  timeRange,
  limit,
  offset,
}: GetUserTopVariables): Promise<AxiosResponse<Tracks, any>> =>
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/tracks`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      timeRange,
      limit,
      offset,
    },
  });

export const GET_USER_TOP_ARTISTS = async ({
  token,
  timeRange,
  limit,
  offset,
}: GetUserTopVariables): Promise<AxiosResponse<Artists, any>> =>
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/artists`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      timeRange,
      limit,
      offset,
    },
  });

export interface GetUserTopsVariables {
  token: string;
  type: TypeItem;
  timeRange?: TimeRangeItem;
  limit?: number;
  offset?: number;
}

export const GET_USER_TOPS = async ({
  token,
  type,
  timeRange,
  limit,
  offset,
}: GetUserTopsVariables): Promise<AxiosResponse<Artists, any>> =>
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/${type}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      timeRange,
      limit,
      offset,
    },
  });
