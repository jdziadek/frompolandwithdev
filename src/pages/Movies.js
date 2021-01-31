import React, { useCallback, useContext, useEffect } from "react";
import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MoviesContext } from "../contexts";
import { useSearchQuery } from "../hooks";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Movie from "../models/Movie";

const MoviesPage = () => {
  const { colorMode } = useColorMode();
  const [
    { data: movies, isFetching, params, totalResults },
    dispatchMovies,
  ] = useContext(MoviesContext);

  const { query, setQuery } = useSearchQuery({
    onChangeDebouncedQuery: useCallback(
      (searchQuery) => {
        if (!searchQuery) {
          dispatchMovies({ type: "clear" });
        } else {
          dispatchMovies({
            type: "setParams",
            payload: { query: searchQuery, page: 1 },
          });
        }
      },
      [dispatchMovies]
    ),
  });

  const infiniteRef = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: totalResults > movies.length,
    threshold: 200,
    onLoadMore: () => dispatchMovies({ type: "setNextPage" }),
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [movies, totalResults] = await Movie.fetchAll({ params });
        dispatchMovies({
          type: "add",
          payload: {
            data: movies,
            total: totalResults,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (params.query) {
      fetchMovies();
    }
  }, [params, dispatchMovies]);

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
      <Grid
        ref={infiniteRef}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={5}
        mb={4}
      >
        {movies.map((movie) => (
          <Flex
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            shadow="md"
            borderRadius="sm"
            overflow="hidden"
            flexDir="column"
          >
            <Flex h={360}>
              <Image src={movie.getPoster()} objectFit="contain" w="full" />
            </Flex>
            <Flex
              p={3}
              flex={1}
              flexDir="column"
              justifyContent="space-between"
            >
              <Heading as="h2" size="sm" mb={2}>
                {movie.getTitle()}
              </Heading>
              <Flex justifyContent="space-between">
                <Text>{movie.getYear()}</Text>
                <Badge>{movie.getType()}</Badge>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </>
  );
};
export default MoviesPage;
