import {
  INIT_PHOTO_QUERY_STATE,
  PhotoQueryActionType,
  photoQueryReducer,
} from './photoQueryReducer';

describe('photoQueryReducer', () => {
  it('should set isModalOpen to true on modal open request with title and url of image', () => {
    const newState = photoQueryReducer(INIT_PHOTO_QUERY_STATE, {
      type: PhotoQueryActionType.OnInputChange,
      value: 'dogs',
    });

    expect(newState).toEqual({
      inputText: 'dogs',
      queryText: '',
      page: 0,
    });
  });

  it('should set reset inputText and page OnSubmit', () => {
    const stateAfterInput = photoQueryReducer(INIT_PHOTO_QUERY_STATE, {
      type: PhotoQueryActionType.OnInputChange,
      value: 'dogs',
    });

    const newState = photoQueryReducer(stateAfterInput, {
      type: PhotoQueryActionType.OnSubmit,
    });

    expect(newState).toEqual({
      inputText: '',
      queryText: 'dogs',
      page: 0,
    });
  });

  it('should set pageNumber OnPageButtonClick', () => {
    const newState = photoQueryReducer(INIT_PHOTO_QUERY_STATE, {
      type: PhotoQueryActionType.OnPageButtonClick,
      pageNumber: 10,
    });

    expect(newState).toEqual({
      inputText: '',
      queryText: '',
      page: 10,
    });
  });
});
