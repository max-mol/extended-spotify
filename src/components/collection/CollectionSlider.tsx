"use client";

import Image from "next/image";
import { Album as AlbumType, SavedAlbum } from "@/models/albums/typing";
import { imageLoader } from "@/utils/imageLoader";
import { Box, IconButton, Paper } from "@mui/material";
import "./CollectionSlider.css";
import { useEffect, useState } from "react";
import { generateKeySync } from "crypto";
import Button from "../ui/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface AlbumProps {
  album: AlbumType;
  albumClass?: string;
}

const Album = ({ album, albumClass }: AlbumProps) => {
  const [displayInfos, setDisplayInfos] = useState(false);

  return (
    <Box>
      <ImageAlbum
        name={album.name}
        url={album.images[1].url}
        onClick={() => setDisplayInfos(!displayInfos)}
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
  albumClass?: string;
}
const ImageAlbum = ({ name, url, onClick, albumClass }: ImageAlbumProps) => (
  <Image
    alt={`${name} album cover`}
    loader={() => imageLoader(url, 300)}
    src={`${url}`}
    width={300}
    height={300}
    style={{ cursor: "pointer" }}
    onClick={onClick}
    className={albumClass}
  />
);

interface CollectionSliderProps {
  collection: SavedAlbum[];
}

const CollectionSlider = ({ collection }: CollectionSliderProps) => {
  const [albumsRange, setAlbumsRange] = useState({ start: 0, end: 5 });
  const [albums, setAlbums] = useState(collection.slice(0, 5));

  useEffect(() => {
    const updateAlbums = () => {
      setAlbums(collection.slice(albumsRange.start, albumsRange.end));
    };

    updateAlbums();
  }, [albumsRange, collection]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <IconButton
        aria-label="previous"
        color="primary"
        onClick={() =>
          setAlbumsRange((prev) => ({
            start: prev.start - 5,
            end: prev.end - 5,
          }))
        }
      >
        <ArrowBackIosIcon />
      </IconButton>
      {albums.map((album) => (
        <Album key={album.album.id} album={album.album} />
      ))}
      <IconButton aria-label="next" color="primary">
        <ArrowForwardIosIcon
          onClick={() =>
            setAlbumsRange((prev) => ({
              start: prev.start + 5,
              end: prev.end + 5,
            }))
          }
        />
      </IconButton>
    </Box>
  );
};

export default CollectionSlider;
