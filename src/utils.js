import qs from "query-string";

export const getURLParams = () => {
  const parsedUrlParams = qs.parse(window.location.search);
  return parsedUrlParams;
};
