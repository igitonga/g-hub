import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'same-origin',
});

const apolloClient = new ApolloClient({
    link: httpLink,  
    cache: new InMemoryCache()
});

export default apolloClient;
