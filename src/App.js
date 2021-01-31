import React from "react";
import {
  Heading,
  Container,
  Flex,
  Button,
  useColorMode,
} from "@chakra-ui/react";

import MoviesPage from "./pages/Movies";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="6xl" my={4}>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="lg" mb={4}>
          OMDb
        </Heading>
        <Button onClick={toggleColorMode} size="sm">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
      <MoviesPage />
    </Container>
  );
}

export default App;
