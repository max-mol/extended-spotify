import { UserAlbums } from "@/models/albums/typing";
import axios, { AxiosResponse } from "axios";

export const GET_USER_SAVED_ALBUMS = async (
  token: string
): Promise<AxiosResponse<UserAlbums, any>> =>
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/albums",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
