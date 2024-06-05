import { GET_TOKEN } from "./TokenServiceResource";

export const getTokenQuery = async (code: string) => GET_TOKEN({ code: code });
