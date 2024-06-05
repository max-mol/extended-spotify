import axios, { AxiosResponse } from "axios";

interface GetTokenVariables {
  code: string;
}

interface GetTokenResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export const GET_TOKEN = ({
  code,
}: GetTokenVariables): Promise<AxiosResponse<GetTokenResult, any>> => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;

  return axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
    }).toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
  });
};
