import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const MoviesPage = () => {
  const [query, setQuery] = useState();
  return (
    <>
      <Box py={4} mb={4}>
        <InputGroup size="lg" variant="filled">
          <Input
            placeholder="Search movie by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement children={<SearchIcon color="gray.300" />} />
        </InputGroup>
      </Box>
    </>
  );
};
export default MoviesPage;
