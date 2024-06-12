"use client";

import { useEffect, useReducer, useState } from "react";

import Image from "next/image";

import { CircularProgress } from "@mui/material";

import { imageLoader } from "@/utils/imageLoader";
import { getAllUserSavedAlbums } from "@/services/AlbumsService";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { SavedAlbum } from "@/models/albums/typing";
import CollectionSlider from "@/components/collection/CollectionSlider";

type CollectionStateAction = {
  type: "updateCollection";
  collection: SavedAlbum[];
};

type CollectionLocalState = {
  collection?: SavedAlbum[];
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
        <CollectionSlider collection={collectionState.collection} />
      )}
      {/* {collectionState.collection?.map(({ album }) => (
        <Image
          key={album.id}
          alt={`${album.name} album cover`}
          loader={() => imageLoader(album.images[1].url, 150)}
          src={`${album.images[1].url}`}
          width={150}
          height={150}
        />
      ))} */}
    </>
  );
}
