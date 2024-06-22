import { SavedAlbum } from "@/models/albums/typing";
import { useState } from "react";
import _intersection from "lodash/intersection";

const useCollectionData = ({
  collection,
  onResetPage,
}: {
  collection: SavedAlbum[];
  onResetPage: () => void;
}): {
  filteredCollection: SavedAlbum[];
  handleFilterByGenresCollection: (filterWith: string[]) => void;
} => {
  const [filteredCollection, setFilteredCollection] = useState(collection);

  const handleFilterByGenresCollection = (filterWith: string[]) => {
    if (filterWith.length > 0) {
      const newCollection = collection.filter(
        (album) => _intersection(album.album.genres, filterWith).length > 0
      );
      onResetPage();
      setFilteredCollection(newCollection);
      return;
    }

    setFilteredCollection(collection);
  };

  return {
    filteredCollection: filteredCollection,
    handleFilterByGenresCollection: handleFilterByGenresCollection,
  };
};

export default useCollectionData;
