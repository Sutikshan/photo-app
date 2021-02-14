import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { PAGE_SIZE } from './constants';
import ImageModal from './ImageModal/ImageModal';
import PageNavigator from './PageNavigator/PageNavigator';
import { PHOTOS_QUERY } from './photosQuery';
import './styles.scss';

interface IPhoto {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
}

const Home: React.FunctionComponent = () => {
  const [inputText, setInputText] = useState('');
  const [queryText, setQueryText] = useState('');
  const [page, setPage] = useState(0);

  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setImageUrl('');
  };

  const handleZoomClick = (title: string, url: string) => {
    setImageUrl(url);
    setImageTitle(title);
    setIsModalOpen(true);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  const handleQuerySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setQueryText(inputText);
    setInputText('');
  };

  const handlePageButtonClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const { loading, error, data } = useQuery(PHOTOS_QUERY, {
    variables: {
      options: {
        paginate: { page, limit: PAGE_SIZE },
        search: { q: queryText },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${JSON.stringify(error, null, 2)}</p>;

  const {
    data: photoList,
    meta: { totalCount },
  } = data.photos;

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
            value={inputText}
          />
          <button type="submit" disabled={inputText.length <= 0}>
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
            <th>Title {queryText && `containing "${queryText}"`} </th>
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
        title={imageTitle}
      />
    </>
  );
};

export default Home;
