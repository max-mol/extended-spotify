import { GET_USER_SAVED_ALBUMS } from "./AlbumsServiceResource";

export const getUserSavedAlbums = (token: string) =>
  GET_USER_SAVED_ALBUMS(token);
