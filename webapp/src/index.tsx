import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import './assets/styles/index.scss';
import Home from './views/Home';

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const Application: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

render(<Application />, document.getElementById('root'));
