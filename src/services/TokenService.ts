import { GET_TOKEN } from "./TokenServiceResource";

export const getTokenQuery = async (code: string, buf: string) =>
  GET_TOKEN({ buf: buf, code: code });
