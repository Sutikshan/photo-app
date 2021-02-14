import { gql } from '@apollo/client';

export const PHOTOS_QUERY = gql`
  query photos($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        id
        title
        url
        thumbnailUrl
        album {
          title
        }
      }
      links {
        first {
          page
          limit
        }
        prev {
          page
          limit
        }
        next {
          page
          limit
        }
        last {
          page
          limit
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
