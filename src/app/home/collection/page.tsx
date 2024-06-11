"use client";

import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { UserAlbums } from "@/models/albums/typing";
import { getUserSavedAlbums } from "@/services/AlbumsService";
import { useEffect, useReducer } from "react";

type CollectionStateAction = {
  type: "updateCollection";
  collection: UserAlbums;
};

type CollectionLocalState = {
  collection?: UserAlbums;
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

  const [collectionState, dispatchCollectionStateAction] = useReducer(
    collectionReducer,
    {}
  );

  useEffect(() => {
    const handleGetCollection = async () => {
      try {
        const res = await getUserSavedAlbums(token);
        dispatchCollectionStateAction({
          type: "updateCollection",
          collection: res.data,
        });
      } catch (e) {
        enqueueSnackbar(
          "error",
          "An error has occured, can't reach user collection"
        );
      }
    };

    handleGetCollection();
  }, [token]);
  return <div>Collection</div>;
}
