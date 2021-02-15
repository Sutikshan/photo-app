import {
  INIT_ZOOM_MODAL_STATE,
  ModalActionType,
  zoomModalReducer,
} from './zoomModalReducer';

describe('zoomModalReducer', () => {
  it('should set isModalOpen to true on modal open request with title and url of image', () => {
    const url = 'http://picasa';
    const title = 'cat';
    const newState = zoomModalReducer(INIT_ZOOM_MODAL_STATE, {
      type: ModalActionType.OnModalOpenRequest,
      url,
      title,
    });

    expect(newState).toEqual({
      isModalOpen: true,
      url,
      title,
    });
  });

  it('should set isModalOpen to false OnModalClose', () => {
    const newState = zoomModalReducer(INIT_ZOOM_MODAL_STATE, {
      type: ModalActionType.OnModalClose,
    });

    expect(newState).toEqual({
      isModalOpen: false,
      url: '',
      title: '',
    });
  });
});
