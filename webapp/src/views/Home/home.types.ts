export interface IPhoto {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export interface ILink {
  page: number;
  limit: number;
}

export interface ILinks {
  first: ILink;
  prev: ILink;
  next: ILink;
  last: ILink;
}

export interface IPhotoQueryMeta {
  totalCount: number;
}

export interface IPhotoData {
  data: [IPhoto];
  links: ILinks;
  meta: IPhotoQueryMeta;
}

export interface IPhotoQueryResponse {
  photos: IPhotoData;
}

// query argument types
export interface IPhotoQueryText {
  q: string;
}

export interface IPhotoQueryPaginateOptions {
  page: number;
  limit: number;
}
export interface IPhotoQueryVars {
  options: {
    paginate: IPhotoQueryPaginateOptions;
    search: IPhotoQueryText;
  };
}
