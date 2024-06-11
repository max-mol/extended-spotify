import { User } from "@/models/user/typing";
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
