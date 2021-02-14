import { useQuery } from '@apollo/client';
import React from 'react';
import { PHOTOS_QUERY } from './photosQuery';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
interface IPhoto {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const Home: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(PHOTOS_QUERY, {
    variables: {
      options: {
        paginate: { page: 0, limit: DEFAULT_PAGE_SIZE },
        search: { q: '' },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${JSON.stringify(error, null, 2)}</p>;

  const { data: photoList } = data.photos;

  return (
    <>
      <h1>Photo Album</h1>
      <fieldset>
        <input autoFocus type="search" placeholder="Search keywords on title" />
      </fieldset>
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
