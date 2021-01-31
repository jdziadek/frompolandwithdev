export const initMoviesContext = {
  data: [],
  isFetching: false,
  params: {
    query: "",
    page: 1,
  },
  errorMsg: null,
  totalResults: 0,
};

export const moviesReducer = (state, { type, payload }) => {
  switch (type) {
    case "add":
      return {
        ...state,
        data: [...state.data, ...payload.data],
        totalResults: parseInt(payload.total, 10),
        isFetching: false,
      };
    case "setNextPage":
      return {
        ...state,
        isFetching: true,
        params: {
          ...state.params,
          page: state.params.page + 1,
        },
      };
    case "setParams":
      return {
        ...initMoviesContext,
        isFetching: true,
        params: {
          ...state.params,
          ...payload,
        },
      };
    case "setError":
      return {
        ...state,
        isFetching: false,
        errorMsg: payload,
      };
    case "clear":
      return initMoviesContext;
    default:
      throw new Error("Unknown action in Movies reducer", "unknown-action");
  }
};
