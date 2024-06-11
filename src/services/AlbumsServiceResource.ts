import { UserAlbums } from "@/models/albums/typing";
import axios, { AxiosResponse } from "axios";

export interface GetUserSavedAlbumsVariables {
  token: string;
  limit?: number;
  offset?: number;
}

export const GET_USER_SAVED_ALBUMS = async ({
  token,
  limit,
  offset,
}: GetUserSavedAlbumsVariables): Promise<AxiosResponse<UserAlbums, any>> => {
  return axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/albums",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      offset,
    },
  });
};
