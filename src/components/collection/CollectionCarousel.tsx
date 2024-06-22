"use client";

import Image from "next/image";
import { Album as AlbumType, SavedAlbum } from "@/models/albums/typing";
import { imageLoader } from "@/utils/imageLoader";
import {
  Autocomplete,
  Box,
  IconButton,
  Pagination,
  PaginationItem,
  Slider,
  TextField,
} from "@mui/material";
import "./CollectionSlider.css";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfosAlbum from "./InfosAlbum";
import theme from "@/libs/theme/light";
import _intersection from "lodash/intersection";
import useCollectionData from "./useCollectionData";

const alphabet = "&ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface AlbumProps {
  album: AlbumType;
  size: number;
  albumClass?: string;
}

const Album = ({ album, size, albumClass }: AlbumProps) => {
  const [displayInfos, setDisplayInfos] = useState(false);

  return (
    <Box width={size}>
      <ImageAlbum
        name={album.name}
        url={album.images[1].url}
        onClick={() => setDisplayInfos(!displayInfos)}
        size={size}
        albumClass={albumClass}
      />
      {displayInfos && (
        <Box
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "0 0 15px 15px",
          }}
        >
          <InfosAlbum album={album} />
        </Box>
      )}
    </Box>
  );
};

interface ImageAlbumProps {
  name: string;
  url: string;
  onClick: () => void;
  size: number;
  albumClass?: string;
}
const ImageAlbum = ({
  name,
  url,
  onClick,
  size,
  albumClass,
}: ImageAlbumProps) => (
  <Image
    alt={`${name} album cover`}
    loader={() => imageLoader(url, 300)}
    src={`${url}`}
    width={size}
    height={size}
    style={{ cursor: "pointer" }}
    onClick={onClick}
    className={albumClass}
  />
);

interface CollectionCarouselProps {
  collection: SavedAlbum[];
  genres?: string[];
}

const CollectionCarousel = ({
  collection,
  genres = [],
}: CollectionCarouselProps) => {
  const displayedAlbumNumber = 5;
  const [albumsRange, setAlbumsRange] = useState({
    start: 0,
    end: displayedAlbumNumber,
  });
  const [size, setSize] = useState(215);
  const [page, setPage] = useState(1);

  const handleResetAlbumsRange = () => {
    setAlbumsRange({
      start: 0,
      end: displayedAlbumNumber,
    });
  };

  const { filteredCollection, handleFilterByGenresCollection } =
    useCollectionData({ collection, onResetPage: handleResetAlbumsRange });

  const [albums, setAlbums] = useState(
    filteredCollection.slice(0, displayedAlbumNumber)
  );

  useEffect(() => {
    const updateAlbums = () => {
      setAlbums(filteredCollection.slice(albumsRange.start, albumsRange.end));
    };

    updateAlbums();
    const alphabetIndex = alphabet.indexOf(
      filteredCollection[
        albumsRange.start
      ].album.artists[0].name[0].toUpperCase()
    );
    setPage(alphabetIndex !== -1 ? alphabetIndex + 1 : 1);
  }, [albumsRange, filteredCollection]);

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);
  };

  const handleChangePage = (newPage: number) => {
    const letter = alphabet[newPage - 1];
    const newIndex = filteredCollection.findIndex((album) =>
      album.album.artists[0].name.toUpperCase().startsWith(letter)
    );

    setAlbumsRange({
      start: newIndex !== -1 ? newIndex : 0,
      end:
        newIndex !== -1
          ? newIndex + displayedAlbumNumber
          : displayedAlbumNumber,
    });
  };

  return (
    <>
      <Box display="flex" alignItems="center" mt={5}>
        <Slider
          defaultValue={215}
          min={150}
          max={500}
          onChange={(_, value) => handleChangeSize(value as number)}
          sx={{ ml: 5, mr: 5, width: "20%" }}
        />
        <Autocomplete
          multiple
          defaultValue={[]}
          onChange={(_, values) => {
            handleFilterByGenresCollection(values);
          }}
          options={genres}
          sx={{
            ml: 5,
            mr: 5,
            minWidth: "25%",
          }}
          renderInput={(params) => <TextField {...params} label="Genres" />}
        />
      </Box>
      <Box display="flex" justifyContent="center" m={2}>
        <Pagination
          count={alphabet.length}
          page={page}
          size="small"
          color="primary"
          onChange={(_, page) => handleChangePage(page)}
          renderItem={(item) => {
            return (
              <PaginationItem
                {...item}
                page={item.page ? alphabet[item.page - 1] : "..."}
                sx={{ color: "white", fontColor: "white" }}
              />
            );
          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          aria-label="previous"
          color="primary"
          onClick={() =>
            setAlbumsRange((prev) => ({
              start:
                prev.start - displayedAlbumNumber >= 0
                  ? prev.start - displayedAlbumNumber
                  : 0,
              end:
                prev.start - displayedAlbumNumber >= 0
                  ? prev.end - displayedAlbumNumber
                  : displayedAlbumNumber,
            }))
          }
          disabled={albumsRange.start <= 0}
        >
          <ArrowBackIosIcon />
        </IconButton>
        {albums.map((album) => (
          <Album key={album.album.id} size={size} album={album.album} />
        ))}
        <IconButton
          aria-label="next"
          color="primary"
          onClick={() =>
            setAlbumsRange((prev) => ({
              start:
                prev.end + displayedAlbumNumber < filteredCollection.length
                  ? prev.start + displayedAlbumNumber
                  : filteredCollection.length - displayedAlbumNumber,
              end:
                prev.end + displayedAlbumNumber < filteredCollection.length
                  ? prev.end + displayedAlbumNumber
                  : filteredCollection.length,
            }))
          }
          disabled={albumsRange.end >= filteredCollection.length}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default CollectionCarousel;
