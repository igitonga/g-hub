import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/graphql' : `https://g-btlqr9mc1-igitongas-projects.vercel.app/api/graphql`,
    credentials: 'same-origin',
});

const apolloClient = new ApolloClient({
    link: httpLink,  
    cache: new InMemoryCache()
});

export default apolloClient;
