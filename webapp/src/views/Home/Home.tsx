import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { PHOTOS_QUERY } from './photosQuery';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
interface IPhoto {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const Home: React.FunctionComponent = () => {
  const [inputText, setInputText] = useState('');
  const [queryText, setQueryText] = useState('');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  const handleQuerySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQueryText(inputText);
  };

  const { loading, error, data } = useQuery(PHOTOS_QUERY, {
    variables: {
      options: {
        paginate: { page: 0, limit: DEFAULT_PAGE_SIZE },
        search: { q: queryText },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${JSON.stringify(error, null, 2)}</p>;

  const { data: photoList } = data.photos;

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
            <th>Title</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {photoList.map((photo: IPhoto) => (
            <tr key={photo.id}>
              <td data-label="ID">{photo.id}</td>
              <td data-label="Title">{photo.title}</td>
              <td data-label="Thumbnail">
                <img src={photo.thumbnailUrl} alt={`image ${photo.title}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
