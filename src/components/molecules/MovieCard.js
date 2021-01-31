import React from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Heading,
  useColorMode,
  Image,
  Text,
  Badge,
} from "@chakra-ui/react";

import Movie from "../../models/Movie";

const MovieCard = ({ movie }) => {
  const { colorMode } = useColorMode();
  return (
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
      <Flex p={3} flex={1} flexDir="column" justifyContent="space-between">
        <Heading as="h2" size="sm" mb={2}>
          {movie.getTitle()}
        </Heading>
        <Flex justifyContent="space-between">
          <Text>{movie.getYear()}</Text>
          <Badge alignSelf="center">{movie.getType()}</Badge>
        </Flex>
      </Flex>
    </Flex>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.instanceOf(Movie).isRequired,
};

const MemorizedMovieCard = React.memo(MovieCard);
export default MemorizedMovieCard;
