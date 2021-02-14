export interface ILink {
  page: number;
  limit: number;
}
export interface IPageButtonClick {
  (pageNumber: number): void;
}

export interface IPageNavigatorProps {
  currentPage: number;
  totalCount: number;
  onPageButtonClick: IPageButtonClick;
}
