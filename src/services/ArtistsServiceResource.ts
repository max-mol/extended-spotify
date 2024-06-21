import { Artist } from "@/models/artists/typing";
import axios, { AxiosResponse } from "axios";

export interface GetSeveralArtistsVariables {
  listIds: string[];
  token: string;
}

export interface GetSeveralArtistsResult {
  artists: Artist[];
}

export const GET_SEVERAL_ARTISTS = async ({
  listIds,
  token,
}: GetSeveralArtistsVariables): Promise<
  AxiosResponse<GetSeveralArtistsResult, any>
> => {
  let ids: string = "";

  listIds.forEach((id) => {
    ids += `${id},`;
  });

  return axios({
    method: "get",
    url: "https://api.spotify.com/v1/artists",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ids },
  });
};
