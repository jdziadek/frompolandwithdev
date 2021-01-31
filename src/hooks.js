import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export const useDebouncedFunc = () => {
  const func = useRef(debounce((f) => f(), 500));
  return func.current;
};

export const useSearchQuery = ({ onChangeDebouncedQuery }) => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
