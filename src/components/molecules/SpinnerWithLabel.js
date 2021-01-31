import React from "react";
import PropTypes from "prop-types";
import { Flex, Spinner, Text } from "@chakra-ui/react";

const SpinnerWithLabel = ({ children }) => {
  return (
    <Flex justifyContent="center">
      <Spinner
        thickness={2}
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
        mr={3}
      />
      <Flex alignItems="center">
        <Text>{children}</Text>
      </Flex>
    </Flex>
  );
};

SpinnerWithLabel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SpinnerWithLabel;
