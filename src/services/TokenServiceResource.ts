import axios, { AxiosResponse } from "axios";

interface GetTokenVariables {
  buf: string;
  code: string;
}

interface GetTokenResult {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const GET_TOKEN = ({
  buf,
  code,
}: GetTokenVariables): Promise<AxiosResponse<GetTokenResult, any>> =>
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
    }).toString(),
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.NEXT_PUBLIC_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_CLIENT_SECRET
        ).toString("base64"),
    },
  });
