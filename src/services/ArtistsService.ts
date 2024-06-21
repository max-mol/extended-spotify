import {
  GET_SEVERAL_ARTISTS,
  GetSeveralArtistsVariables,
} from "./ArtistsServiceResource";
import { Artist } from "@/models/artists/typing";

export const getSeveralArtists = async ({
  listIds,
  token,
}: GetSeveralArtistsVariables) => {
  const callsNb = Math.floor(listIds.length / 45) + 1;
  let artistsArr = [];
  let start = 0;
  let end = 45;

  if (listIds.length > 45) {
    for (let i = 0; i < callsNb; i++) {
      artistsArr.push(listIds.slice(start, end + 1));
      start += 45;
      end += 45;
    }
  } else {
    artistsArr = [listIds];
  }

  const res: Artist[] = await Promise.all(
    artistsArr.map((artists) =>
      GET_SEVERAL_ARTISTS({ listIds: artists, token })
    )
  )
    .then((values) => {
      let artists: Artist[] = [];

      for (let i = 0; i < values.length; i++) {
        artists = [...artists, ...values[i].data.artists];
      }

      return artists;
    })
    .catch((e) => []);

  return res;
};
