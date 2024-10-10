import { ExternalUrls, Image } from "../typing";

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Followers {
  href: string;
  total: number;
}

export interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export type TypeItem = "artists" | "tracks";

export type TimeRangeItem = "short_term" | "medium_term" | "long_term";
