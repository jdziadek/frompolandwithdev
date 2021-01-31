import axios from "axios";

class Movie {
  constructor(data) {
    this.id = data.imdbID;
    this.type = data.Type;
    this.title = data.Title;
    this.poster = data.Poster;
    this.year = data.Year;
  }

  static fetchAll = async ({ params }) => {
    // http://www.omdbapi.com/#parameters
    const mappedParams = {
      s: params.query || "",
      page: params.page || 1,
      apikey: process.env.REACT_APP_OMDB_API_KEY,
    };

    const { data } = await axios.get("https://www.omdbapi.com", {
      params: mappedParams,
    });

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return [
      (data.Search || []).map((movie) => new this(movie)),
      data.totalResults,
    ];
  };

  getType() {
    return this.type;
  }

  getTitle() {
    return this.title || "";
  }

  getPoster() {
    return this.poster !== "N/A"
      ? this.poster
      : `https://via.placeholder.com/600x900/000000/FFFFFF?text=${this.getTitle()}`;
  }

  getYear() {
    return this.year;
  }
}

export default Movie;
