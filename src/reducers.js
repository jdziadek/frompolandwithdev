export const initMoviesContext = {
  data: [],
  params: {
    query: "",
    page: 1,
  },
  totalResults: 0,
  isFetching: false,
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
        params: {
          ...state.params,
          page: state.params.page + 1,
        },
        isFetching: true,
      };
    case "setParams":
      return {
        ...initMoviesContext,
        params: {
          ...state.params,
          ...payload,
        },
      };
    case "clear":
      return initMoviesContext;
    default:
      throw new Error("Unknown action in Movies reducer", "unknown-action");
  }
};
