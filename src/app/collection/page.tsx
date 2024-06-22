"use client";

import { useEffect, useReducer, useState } from "react";

import Image from "next/image";

import { CircularProgress } from "@mui/material";
import _uniq from "lodash/uniq";
import { imageLoader } from "@/utils/imageLoader";
import { getAllUserSavedAlbums } from "@/services/AlbumsService";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { SavedAlbum } from "@/models/albums/typing";
import CollectionCarousel from "@/components/collection/CollectionCarousel";
import { getSeveralArtists } from "@/services/ArtistsService";

type CollectionStateAction =
  | {
      type: "updateCollection";
      collection: SavedAlbum[];
    }
  | { type: "updateGenres"; genres: string[] };

type CollectionLocalState = {
  collection?: SavedAlbum[];
  genres?: string[];
};

function collectionReducer(
  state: CollectionLocalState,
  action: CollectionStateAction
) {
  if (action.type === "updateCollection") {
    return {
      ...state,
      collection: action.collection,
    };
  }
  if (action.type === "updateGenres") {
    return {
      ...state,
      genres: action.genres,
    };
  }
  return state;
}

export default function Collection() {
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("access_token") as string;

  const [loading, setLoading] = useState(false);
  const [collectionState, dispatchCollectionStateAction] = useReducer(
    collectionReducer,
    {}
  );

  useEffect(() => {
    const handleGetCollection = async () => {
      setLoading(true);
      try {
        const res = await getAllUserSavedAlbums(token);
        const artists = res.map((album) => album.album.artists[0].id);
        let genres: string[] = [];

        const artistsRes = await getSeveralArtists({
          listIds: _uniq(artists),
          token,
        });

        res.forEach((album) => {
          const genre = artistsRes.find(
            (artist) => artist.id === album.album.artists[0].id
          )?.genres;

          if (genre) {
            album.album.genres = genre;
            genres = [...genres, ...genre];
          }
        });
        dispatchCollectionStateAction({
          type: "updateGenres",
          genres: _uniq(genres),
        });
        dispatchCollectionStateAction({
          type: "updateCollection",
          collection: res,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        enqueueSnackbar(
          "error",
          "An error has occured, can't reach user collection"
        );
      }
    };

    handleGetCollection();
  }, [token]);

  if (loading) return <CircularProgress />;

  return (
    <>
      {collectionState.collection && (
        <CollectionCarousel
          collection={collectionState.collection}
          genres={collectionState.genres}
        />
      )}
    </>
  );
}
