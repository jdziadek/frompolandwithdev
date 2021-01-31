import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export const useDebouncedFunc = () => {
  const func = useRef(debounce((f) => f(), 500));
  return func.current;
};

export const useSearchQuery = ({ onChangeDebouncedQuery, defaultQuery }) => {
  const [query, setQuery] = useState(defaultQuery || "");
  const [searchQuery, setSearchQuery] = useState(defaultQuery || "");
  const debouncedSetSearchQuery = useDebouncedFunc();

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
