import React, { useCallback, useContext, useEffect } from "react";
import {
  Alert,
  Box,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { MoviesContext } from "../contexts";
import { useSearchQuery } from "../hooks";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Movie from "../models/Movie";
import MovieCard from "../components/molecules/MovieCard";
import SpinnerWithLabel from "../components/molecules/SpinnerWithLabel";
import { getURLParams } from "../utils";

const MoviesPage = () => {
  const [
    { data: movies, isFetching, params, totalResults, errorMsg },
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
    defaultQuery: getURLParams().query || "",
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
        dispatchMovies({ type: "setError", payload: e.message });
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
      {errorMsg && <Alert status="info">{errorMsg}</Alert>}
      {isFetching && movies.length === 0 && (
        <SpinnerWithLabel>Searching ...</SpinnerWithLabel>
      )}
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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      {isFetching && movies.length > 0 && (
        <SpinnerWithLabel>Searching ...</SpinnerWithLabel>
      )}
    </>
  );
};
export default MoviesPage;
