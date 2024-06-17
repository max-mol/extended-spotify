"use client";

import Image from "next/image";
import { Album as AlbumType, SavedAlbum } from "@/models/albums/typing";
import { imageLoader } from "@/utils/imageLoader";
import {
  Box,
  IconButton,
  Pagination,
  PaginationItem,
  Slider,
} from "@mui/material";
import "./CollectionSlider.css";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const alphabet = "&ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface AlbumProps {
  album: AlbumType;
  size: number;
  albumClass?: string;
}

const Album = ({ album, size, albumClass }: AlbumProps) => {
  const [displayInfos, setDisplayInfos] = useState(false);

  return (
    <Box>
      <ImageAlbum
        name={album.name}
        url={album.images[1].url}
        onClick={() => setDisplayInfos(!displayInfos)}
        size={size}
        albumClass={albumClass}
      />
      {displayInfos && (
        <Box>
          <div>{album.name}</div>
          <div>{album.release_date.slice(0, 4)}</div>
          <div>{album.album_type}</div>
          <div>{album.label}</div>
          {album.genres.map((genre) => (
            <div key={genre}>{genre}</div>
          ))}
          <div>{album.artists[0].name}</div>
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
}

const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  const displayedAlbumNumber = 5;
  const [albumsRange, setAlbumsRange] = useState({
    start: 0,
    end: displayedAlbumNumber,
  });
  const [albums, setAlbums] = useState(
    collection.slice(0, displayedAlbumNumber)
  );
  const [size, setSize] = useState(215);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateAlbums = () => {
      setAlbums(collection.slice(albumsRange.start, albumsRange.end));
    };

    updateAlbums();
    const alphabetIndex = alphabet.indexOf(
      collection[albumsRange.start].album.artists[0].name[0].toUpperCase()
    );
    setPage(alphabetIndex !== -1 ? alphabetIndex + 1 : 1);
  }, [albumsRange, collection]);

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);
  };

  const handleChangePage = (newPage: number) => {
    const letter = alphabet[newPage - 1];
    const newIndex = collection.findIndex((album) =>
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
      <Slider
        defaultValue={215}
        min={150}
        max={500}
        onChange={(_, value) => handleChangeSize(value as number)}
        sx={{ m: 5, width: "20%" }}
      />
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
                prev.end + displayedAlbumNumber < collection.length
                  ? prev.start + displayedAlbumNumber
                  : collection.length - displayedAlbumNumber,
              end:
                prev.end + displayedAlbumNumber < collection.length
                  ? prev.end + displayedAlbumNumber
                  : collection.length,
            }))
          }
          disabled={albumsRange.end >= collection.length}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default CollectionCarousel;
