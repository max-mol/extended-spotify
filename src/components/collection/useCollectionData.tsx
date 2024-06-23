import { SavedAlbum } from "@/models/albums/typing";
import { useState } from "react";
import _intersection from "lodash/intersection";
import _findIndex from "lodash/findIndex";

const useCollectionData = ({
  collection,
  onResetPage,
}: {
  collection: SavedAlbum[];
  onResetPage: () => void;
}): {
  filteredCollection: SavedAlbum[];
  handleFilterByGenresCollection: (filterWith: string[]) => void;
  handleFilterByDatesCollection: (filterWith: string[]) => void;
} => {
  const [filteredCollection, setFilteredCollection] = useState(collection);

  const handleFilterByGenresCollection = (filterWith: string[]) => {
    if (filterWith.length > 0) {
      const newCollection = collection.filter(
        (album) => _intersection(album.album.genres, filterWith).length > 0
      );
      setFilteredCollection(newCollection);
      onResetPage();
      return;
    }

    setFilteredCollection(collection);
    onResetPage();
  };

  const handleFilterByDatesCollection = (filterWith: string[]) => {
    onResetPage();

    if (filterWith.length > 0) {
      collection.forEach((album) => {
        if (album.album.release_date === filterWith[0]) {
          console.log(album);
          console.log(album.album.release_date.slice(0, 4));
          console.log(
            _findIndex(
              filterWith,
              (o) => o === album.album.release_date.slice(0, 4)
            )
          );
        }
      });
      const newCollection = collection.filter((album) => {
        return (
          _findIndex(
            filterWith,
            (o) => o === album.album.release_date.slice(0, 4)
          ) !== -1
        );
      });
      setFilteredCollection(newCollection);
      return;
    }

    setFilteredCollection(collection);
  };

  return {
    filteredCollection: filteredCollection,
    handleFilterByGenresCollection: handleFilterByGenresCollection,
    handleFilterByDatesCollection: handleFilterByDatesCollection,
  };
};

export default useCollectionData;
