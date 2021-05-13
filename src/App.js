import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Search from './components/search';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://graphql-weather-api.herokuapp.com/',
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Search />
      </ApolloProvider>
    </>
  );
}

export default App;
