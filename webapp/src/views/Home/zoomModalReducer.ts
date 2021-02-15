export interface IZoomModalState {
  url: string;
  title: string;
  isModalOpen: boolean;
}

export enum ModalActionType {
  OnModalClose,
  OnModalOpenRequest,
}

export const INIT_ZOOM_MODAL_STATE: IZoomModalState = {
  url: '',
  title: '',
  isModalOpen: false,
};

type ZoomModalAction =
  | { type: ModalActionType.OnModalClose }
  | { type: ModalActionType.OnModalOpenRequest; title: string; url: string };

export const zoomModalReducer = (
  state: IZoomModalState,
  action: ZoomModalAction
): IZoomModalState => {
  switch (action.type) {
    case ModalActionType.OnModalOpenRequest:
      return { isModalOpen: true, url: action.url, title: action.title };
    case ModalActionType.OnModalClose:
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};
