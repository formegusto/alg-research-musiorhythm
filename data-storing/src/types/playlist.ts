export interface Playlists {
  href: string;
  items: Item[];
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
}

export interface Item {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  primary_color: any;
  public: any;
  snapshot_id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: any;
  url: string;
  width: any;
}
