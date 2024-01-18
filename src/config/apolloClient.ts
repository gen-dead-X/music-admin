import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const graphqlServerURI = 'http://localhost:4040/graphql';

const httpLink = new HttpLink({
  uri: graphqlServerURI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create an Apollo Link that adds the bearer token to the headers
const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage or another source
  const token = localStorage.getItem('accessToken');

  // Add the bearer token to the headers
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      app: 'admin',
    },
  });

  return forward(operation);
});

// Create the Apollo Client with the composed links
const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
