import React, { Component } from 'react';
import UserList from './components/UserList';
import Map from './components/Map';
import logo from './logo.svg';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

/* fetch data from graphQL server and print on console */
//client.query({ query: gql`{ hello }` }).then(console.log);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
            <div className="MapContainer">
              <Map />
            </div>
          <div className="App-User">
            <UserList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
