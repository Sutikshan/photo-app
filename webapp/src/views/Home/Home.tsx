import { useQuery } from '@apollo/client';
import React, { useReducer } from 'react';
import { PAGE_SIZE } from './constants';
import './home.styles.scss';
import './home.types';
import { IPhoto, IPhotoQueryResponse, IPhotoQueryVars } from './home.types';
import ImageModal from './ImageModal';
import PageNavigator from './PageNavigator';
import {
  INIT_PHOTO_QUERY_STATE,
  PhotoQueryActionType,
  photoQueryReducer,
} from './photoQueryReducer';
import { PHOTOS_QUERY } from './photosQuery';
import {
  INIT_ZOOM_MODAL_STATE,
  ModalActionType,
  zoomModalReducer,
} from './zoomModalReducer';

const Home: React.FunctionComponent = () => {
  const [queryState, queryUpdateDispatch] = useReducer(
    photoQueryReducer,
    INIT_PHOTO_QUERY_STATE
  );
  const [zoomModalState, zoomModalDispatch] = useReducer(
    zoomModalReducer,
    INIT_ZOOM_MODAL_STATE
  );

  const handleModalClose = () => {
    zoomModalDispatch({ type: ModalActionType.OnModalClose });
  };

  const handleZoomClick = (title: string, url: string) => {
    zoomModalDispatch({ type: ModalActionType.OnModalOpenRequest, title, url });
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    queryUpdateDispatch({
      type: PhotoQueryActionType.OnInputChange,
      value: event.currentTarget.value,
    });
  };

  const handleQuerySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    queryUpdateDispatch({ type: PhotoQueryActionType.OnSubmit });
  };

  const handlePageButtonClick = (pageNumber: number) => {
    queryUpdateDispatch({
      type: PhotoQueryActionType.OnPageButtonClick,
      pageNumber,
    });
  };

  const { page, queryText: q } = queryState;

  const { loading, error, data } = useQuery<
    IPhotoQueryResponse,
    IPhotoQueryVars
  >(PHOTOS_QUERY, {
    variables: {
      options: {
        paginate: { page, limit: PAGE_SIZE },
        search: { q },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.photos)
    return <p>Error ${JSON.stringify(error, null, 2)}</p>;

  const {
    data: photoList,
    meta: { totalCount },
  } = data.photos;
  const { url: imageUrl, title, isModalOpen } = zoomModalState;

  return (
    <>
      <h1>Photo Album</h1>
      <form onSubmit={handleQuerySubmit}>
        <fieldset>
          <input
            autoFocus
            type="search"
            onChange={handleInputChange}
            placeholder="Search keywords on title"
            value={queryState.inputText}
          />
          <button type="submit" disabled={queryState.inputText.length <= 0}>
            Search
          </button>
        </fieldset>
      </form>
      <table>
        <colgroup>
          <col className="idColumn" />
          <col className="titleColumn" />
          <col className="thumbnailColumn" />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title {q && `containing "${q}"`} </th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {photoList.map((photo: IPhoto) => (
            <tr key={photo.id}>
              <td
                className="clickable"
                data-label="ID"
                onClick={() => handleZoomClick(photo.title, photo.url)}
              >
                {photo.id}
              </td>
              <td data-label="Title">{photo.title}</td>
              <td data-label="Thumbnail">
                <img
                  className="clickable"
                  onClick={() => handleZoomClick(photo.title, photo.url)}
                  src={photo.thumbnailUrl}
                  alt={`image ${photo.title}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PageNavigator
        currentPage={page}
        onPageButtonClick={handlePageButtonClick}
        totalCount={totalCount}
      />
      <ImageModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onCloseModal={handleModalClose}
        title={title}
      />
    </>
  );
};

export default Home;
