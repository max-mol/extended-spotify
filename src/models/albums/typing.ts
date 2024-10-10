import {
  Copyrights,
  ExternalIds,
  ExternalUrls,
  Image,
  Restrictions,
} from "../typing";
import { SimplifiedArtist } from "../artists/typing";
import { SimplifiedTracks } from "../tracks/typing";

export interface UserAlbums {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SavedAlbum[];
}

export interface SavedAlbum {
  added_at: string;
  album: Album;
}

export interface Album {
  album_type: "album" | "single" | "collection";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
  tracks: SimplifiedTracks;
  copyrights: Copyrights;
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
}
