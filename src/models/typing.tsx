export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Copyrights {
  text: string;
  type: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}
