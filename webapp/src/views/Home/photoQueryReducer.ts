export interface IPhotoQueryState {
  inputText: string;
  queryText: string;
  page: number;
}

export enum PhotoQueryActionType {
  OnInputChange,
  OnSubmit,
  OnPageButtonClick,
}

export const INIT_PHOTO_QUERY_STATE: IPhotoQueryState = {
  inputText: '',
  queryText: '',
  page: 0,
};

type PageQueryAction =
  | { type: PhotoQueryActionType.OnInputChange; value: string }
  | { type: PhotoQueryActionType.OnSubmit }
  | { type: PhotoQueryActionType.OnPageButtonClick; pageNumber: number };

export const photoQueryReducer = (
  state: IPhotoQueryState,
  action: PageQueryAction
): IPhotoQueryState => {
  switch (action.type) {
    case PhotoQueryActionType.OnInputChange: {
      return { ...state, inputText: action.value };
    }
    case PhotoQueryActionType.OnSubmit: {
      return { inputText: '', queryText: state.inputText, page: 0 };
    }
    case PhotoQueryActionType.OnPageButtonClick: {
      return { ...state, page: action.pageNumber };
    }
    default:
      return state;
  }
};
