import { FC, ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

interface ApolloProviderWrapperProps {
    children: ReactNode;
}

const ApolloProviderWrapper: FC<ApolloProviderWrapperProps> = ({ children }) => {
    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloProviderWrapper;