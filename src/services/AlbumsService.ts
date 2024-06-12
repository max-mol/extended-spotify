import { Album, SavedAlbum } from "@/models/albums/typing";
import {
  GET_USER_SAVED_ALBUMS,
  GetUserSavedAlbumsVariables,
} from "./AlbumsServiceResource";

export const getUserSavedAlbums = ({
  token,
  limit,
  offset,
}: GetUserSavedAlbumsVariables) =>
  GET_USER_SAVED_ALBUMS({ token, limit, offset });

export const getUserSavedAlbumsNumber = async (token: string) => {
  const res = await getUserSavedAlbums({ token: token, limit: 1 });

  return res.data.total;
};

const getTotalAlbumsRanges = (total: number) => {
  const nbAlbumPacks = total / 50;
  let albumsOffsets: number[] = [];
  let offset = 0;

  for (let i = 0; i < nbAlbumPacks; i++) {
    albumsOffsets.push(offset);
    offset += 50;
  }

  return albumsOffsets;
};

export const getAllUserSavedAlbums = async (token: string) => {
  const totalAlbums = await getUserSavedAlbumsNumber(token);

  const albumsOffsets = getTotalAlbumsRanges(totalAlbums);

  const res: SavedAlbum[] = await Promise.all(
    albumsOffsets.map((offset) =>
      getUserSavedAlbums({ token: token, limit: 50, offset: offset })
    )
  )
    .then((values) => {
      let collection: SavedAlbum[] = [];

      for (let i = 0; i < values.length; i++) {
        collection = [...collection, ...values[i].data.items];
      }

      return collection
        .sort((a, b) => {
          const dateA = a.album.release_date;
          const dateB = b.album.release_date;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
        .sort((a, b) => {
          const nameA = a.album.artists[0].name.toUpperCase();
          const nameB = b.album.artists[0].name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
    })
    .catch((e) => []);

  return res;
};
