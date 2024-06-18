import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Mainstack from "./src/Navigator/MainStack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apolloClient";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Mainstack />
      </NavigationContainer>
    </ApolloProvider>
  );
}
