import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import qs from "query-string";

export const useDebouncedFunc = () => {
  const func = useRef(debounce((f) => f(), 500));
  return func.current;
};

export const useSearchQuery = ({ onChangeDebouncedQuery }) => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useDebouncedFunc();

  useEffect(() => {
    const parsedUrlParams = qs.parse(window.location.search);
    if (parsedUrlParams.query) {
      setQuery(parsedUrlParams.query);
      setSearchQuery(parsedUrlParams.query);
    }
  }, []);

  useEffect(() => {
    debouncedSetSearchQuery(() => {
      setSearchQuery(query);
    });
  }, [query, debouncedSetSearchQuery]);

  useEffect(() => {
    if (onChangeDebouncedQuery) {
      onChangeDebouncedQuery(searchQuery);
    }
  }, [onChangeDebouncedQuery, searchQuery]);

  return { query, setQuery };
};
